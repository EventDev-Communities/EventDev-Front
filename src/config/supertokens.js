import SuperTokens from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'
import { API_BASE_URL } from './api'

export const initSuperTokens = () => {
  SuperTokens.init({
    appInfo: {
      appName: 'EventDev',
      apiDomain: 'http://localhost:5122',
      websiteDomain: 'http://localhost:3000',
      apiBasePath: '/api/v1/auth',
      websiteBasePath: '/auth'
    },
    recipeList: [
      EmailPassword.init({
        signInAndUpFeature: {
          disableDefaultUI: true,
          signInForm: {
            formFields: [
              {
                id: 'email',
                label: 'Email',
                placeholder: 'seu@email.com'
              },
              {
                id: 'password',
                label: 'Senha',
                placeholder: '********'
              }
            ]
          }
        }
      }),
      Session.init({
        tokenTransferMethod: 'cookie'
      })
    ]
  })
}

export default SuperTokens
