export interface IAppArgs {
    shouldRegisterControllers: boolean;
    shouldSetupHooks: boolean;
}

export const defaultAppArgs: IAppArgs = {
    shouldRegisterControllers: true,
    shouldSetupHooks: true,
};
