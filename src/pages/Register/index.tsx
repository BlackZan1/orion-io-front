import React, { useEffect, useState } from 'react'
import { 
    Button, 
    Progress, 
    Result, 
    Spin, 
    Steps
} from 'antd'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'

// stores
import { TokensStore } from 'store/tokens'
import { RegisterStore } from 'store/register'
import { AuthStore } from 'store/auth'

// hooks
import { useQuery } from 'hooks/query.hook'
import { usePageTitle } from 'hooks/pageTitle.hook'

// utils
import { routes } from 'utils/router'

// components
import { RegisterFirstStep } from './RegisterFirstStep'
import { RegisterSecondStep } from './RegisterSecondStep'
import { RegisterThirdStep } from './RegisterThirdStep'

let prevPercent = 0
let timer: any

export const RegisterContainer: React.FC = observer(() => {
    const query = useQuery()
    const history = useHistory()

    const [tokensStore] = useState(TokensStore)
    const [registerStore] = useState(RegisterStore)
    const [authStore] = useState(AuthStore)
    const [isOK, setOK] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [sending, setSending] = useState<boolean>(false)
    const [percent, setPercent] = useState<number>(0)
    const [step, setStep] = useState<number>(0)
    const { rename } = usePageTitle('OrionIO | ')

    const tokenValue = query.get('token')

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    useEffect(() => {
        rename('Регистрация')

        if(tokenValue) {
            (async () => {
                const data = await tokensStore.check(tokenValue)

                setOK(data)
                setLoaded(true)
            })()
        }
        else history.push(routes.auth.signin)
    }, [tokenValue])

    useEffect(() => {
        if(sending) {
            const intervalTime = prevPercent >= 50 ? 500 : 300

            timer = setInterval(() => {
                if(prevPercent !== 99) {
                    setPercent(prevPercent + 1)

                    prevPercent += 1
                }
            }, intervalTime)
        }

        return () => {
            prevPercent = 0
            
            setPercent(0)
        }
    }, [sending])

    const sendData = async () => {
        if(!tokenValue) {
            setOK(false)
            
            return
        }

        setSending(true)

        await registerStore.register(tokenValue)

        setTimeout(() => {
            clearInterval(timer)

            setPercent(100)

            authStore.login({
                email: registerStore.data.email,
                password: registerStore.data.password
            })
        }, 300)
    }

    const changeData = (data: any) => registerStore.setData(data)

    const checkEmail = async (email: string) => {
        const notExist = await registerStore.checkEmail(email)

        return notExist
    }
    
    const showContent = () => {
        if(sending) {
            return (
                <div 
                    className='uk-flex uk-flex-center uk-flex-middle'
                    style={{ minHeight: 'inherit' }}
                >
                    <Progress 
                        type='circle'
                        strokeColor={{
                            '0%': 'var(--aqua-color)',
                            '100%': '#87d068',
                        }}
                        percent={percent}
                    />
                </div>
            )
        }

        switch(step) {
            case 0:
                return (
                    <RegisterFirstStep 
                        nextStep={nextStep} 
                        changeData={changeData}
                        defaultData={registerStore.data}
                        checkEmail={checkEmail}
                    />
                )
            case 1:
                return (
                    <RegisterSecondStep 
                        nextStep={nextStep} 
                        prevStep={prevStep} 
                        changeData={changeData}
                        defaultData={registerStore.data}
                    />
                )
            case 2:
                return (
                    <RegisterThirdStep
                        nextStep={sendData} 
                        prevStep={prevStep}
                        changeData={changeData}
                    />
                )
            default:
                return null
        }
    }

    const content = (
        <>
            {
                isOK ? (
                    <>
                        <Steps size='small' current={step}>
                            <Steps.Step title='1-ый шаг' />

                            <Steps.Step title='2-ой шаг' />

                            <Steps.Step title='Финал' />
                        </Steps>

                        { showContent() }
                    </>
                )
                : (
                    <Result
                        status='403'
                        title='Ошибка с токеном'
                        subTitle='Токен уже истек либо был веден неправильно'
                        extra={(
                            <Button 
                                type='primary'
                                style={{ height: 42 }}
                                onClick={() => history.push(routes.auth.signin)}
                            >
                                Уже есть аккаунт?
                            </Button>
                        )}
                    />
                )
            }
        </>
    )

    return (
        <div className='register-block'>
            <div style={{ width: '100%', minHeight: 'inherit' }}>
                {
                    loaded ? (
                        content
                    )
                    : (
                        <div className='register-block__preloader uk-flex uk-flex-middle uk-flex-center'>
                            <Spin size='large' />
                        </div>
                    )
                }
            </div>
        </div>
    )
})