import { gql, useLazyQuery } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'

import { Button } from './components/Button'
import { LoadingIcon } from './assets/LoadingIcon'

import GithubLogo from './assets/logo-github.svg'
import TicketImage from './assets/img-cover-ticket.png'
import AvatarPlaceholder from './assets/img-avatar.png'
import Lines from './assets/lines.svg'
import CheckIcon from './assets/check-icon.svg'

const GET_USER_INFO_QUERY = gql`
  query GetUserInfoQuery($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      name
    }
  }
`

export default function App() {
  const [user, setUser] = useState('')
  const ticketRef = useRef(null)

  const [getUser, { data, loading, error }] = useLazyQuery<{
    user: { avatarUrl: string; login: string; name: string }
  }>(GET_USER_INFO_QUERY)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      getUser({
        variables: {
          login: user,
        },
      })
    },
    [getUser, user],
  )

  const convertTicketToPng = () => {
    toPng(ticketRef.current!, { cacheBust: false })
      .then((url) => {
        const link = document.createElement('a')
        link.download = 'ticket.png'
        link.href = url
        link.click()
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 bg-app bg-cover bg-center bg-no-repeat p-6 text-gray-100 sm:flex-row sm:gap-8">
      <motion.section layout className="flex max-w-[500px] flex-col gap-8">
        <h1 className="bg-gradient-to-br from-white to-purple-500 bg-clip-text font-title text-[40px] uppercase leading-snug text-transparent">
          gere seu ticket e compartilhe com o mundo
        </h1>

        {!data ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label
              className="font-title text-xl uppercase text-gray-100"
              htmlFor="username"
            >
              Digite seu usuário do GitHub
            </label>

            <div className="relative flex h-14 items-stretch gap-4 bg-white text-gray-900 outline outline-transparent transition focus-within:outline-purple-500">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <img src={GithubLogo} alt="Logo do GitHub" />
              </div>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nome de usuário"
                onChange={(e) => setUser(e.target.value)}
                className="flex-1 bg-transparent pl-12 leading-none outline-none placeholder:text-gray-900"
              />
            </div>

            {error && (
              <span className="font-title text-lg text-red-500">
                Usuário inválido. Verifique e tente novamente.
              </span>
            )}

            <Button
              disabled={user === ''}
              title={user === '' ? 'Preencha o campo acima' : ''}
            >
              {loading ? (
                <LoadingIcon className="animate-spin" />
              ) : (
                'gerar meu ticket'
              )}
            </Button>
          </form>
        ) : (
          <div className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-4 leading-none">
              <img src={CheckIcon} alt="Sucesso" />

              <span className="font-title text-xl uppercase">
                ticket gerado com sucesso
              </span>
            </div>

            <Button onClick={convertTicketToPng}>fazer download</Button>
          </div>
        )}
      </motion.section>

      {data && (
        <motion.section
          ref={ticketRef}
          layout
          animate={{
            opacity: 1,
          }}
          className="h-fit w-full bg-ticket bg-cover bg-center bg-no-repeat p-11 opacity-0 sm:w-[400px] md:w-[700px] lg:h-[400px]"
        >
          <div className="flex w-full flex-col-reverse lg:flex-row ">
            <img src={TicketImage} alt="Imagem do Ticket" className="h-full" />

            <div className="flex flex-1 flex-col items-center gap-2 bg-white p-4 text-gray-900">
              <img
                src={data.user?.avatarUrl ?? AvatarPlaceholder}
                alt="Imagem do Usuário"
                className="h-32 w-32 rounded-full"
              />

              <div className="flex flex-col items-center gap-2">
                <span className="font-title text-xs font-medium uppercase tracking-wider text-purple-500">
                  tripulante
                </span>
                <strong className="text-center leading-tight">
                  {data.user?.name ?? data.user?.login ?? 'Seu nome aqui'}
                </strong>
              </div>

              <div className="mt-auto flex w-full justify-between font-title text-xs uppercase">
                <div className="flex flex-col items-start font-medium">
                  <span>evento</span>
                  <span>data</span>
                  <span>hora</span>
                </div>
                <div className="flex flex-col items-start font-bold">
                  <span>ia para devs</span>
                  <span>14 - 16 ago. 2023</span>
                  <span>ao vivo - 19h</span>
                </div>
              </div>

              <img src={Lines} alt="" className="w-full" />
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}
