import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { AuthService } from './service/auth.service';
import { Injector } from '@angular/core';



export interface AppStateModel {
    token: any;
    auth: boolean;
    authError: string;
    user: any;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        token: null,
        auth: false,
        authError: undefined,
        user: undefined
    }
})


export class AppState {

    private static _authService: AuthService;

    constructor(injector: Injector) {
        AppState._authService = injector.get<AuthService>(AuthService);
    }

    @Selector()
    static IsAuth(state: AppStateModel) {
        return state.auth;
    }

    @Receiver()
    static async login({ setState, getState }: StateContext<AppStateModel>,
        { payload }: EmitterAction<{ email: string, password: string }>) {
        const state = getState();
        try {
            const loginStatus = await this._authService.loginEmail(payload.email, payload.password);
            setState({
                ...state,
                auth: loginStatus
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    @Receiver()
    static async updateUser({setState, getState}: StateContext<AppStateModel>, {payload}: EmitterAction<{any}>) {
        const state = getState();
        setState({
            ...state,
            user: payload,
            token: await this._authService.getToken()
        });
    }

    @Receiver()
    static logOut({setState}: StateContext<AppStateModel>) {
        setState({
            token: null,
            auth: false,
            authError: undefined,
            user: undefined
        });
    }

}


