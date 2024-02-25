import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
  AllAuthenticatedStateActions,
  AuthenticatedActions,
} from '../../store/authenticated/authenticated.action';
import { loginUserAccount } from '../../api/auth/sign-in';

const onSubmitForm =
  (
    navigate: NavigateFunction,
    authenticatedDispatch: Dispatch<AllAuthenticatedStateActions>,
  ): React.FormEventHandler<HTMLFormElement> =>
  async (event) => {
    event.preventDefault();
    const result = await loginUserAccount(
      event.target[0].value,
      event.target[1].value,
    );
    console.log(result);
    if (result.valid === true) {
      authenticatedDispatch({
        payload: {
          email: result.email,
          firstname: result.firstname,
          lastname: result.lastname,
        },
        type: AuthenticatedActions.INIT_AUTHENTICATED_APP,
      });
      const token = result.token.toString();
      localStorage.setItem('user-token', token);
      navigate('/dashboard');
    } else
      alert(
        `Veuillez confirmer votre compte sur votre adresse mail ${result.email}`,
      );
  };

export { onSubmitForm };
