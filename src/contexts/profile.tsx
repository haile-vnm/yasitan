import User from '@/integrations/api/models/user';
import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action } from './models';

interface ProfileState {
  user?: User;
}

type ActionType = 'setUser' | 'setBalance';

type ProfileAction = Action<ActionType, Record<string, unknown>>;

const ProfileStateContext = createContext<ProfileState>({});

const ProfileDispatchContext = createContext<
  Dispatch<ProfileAction> | undefined
>(undefined);

function profileReducer(
  state: ProfileState,
  action: ProfileAction,
): ProfileState {
  switch (action.type) {
    case 'setUser': {
      return { ...state, user: action.payload!.user as User };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, {});

  return (
    <ProfileStateContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
}

export function useProfileState() {
  return useContext(ProfileStateContext);
}

export function useProfileDispatch() {
  return useContext(ProfileDispatchContext)!;
}

export const setUser = (dispatch: Dispatch<ProfileAction>, user?: User) => {
  dispatch({ type: 'setUser', payload: { user } });
};
