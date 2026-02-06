
export interface LoginFormProps {
    email: string;
    password: string;
    onEmailChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
    onSubmit: (memberCode: string, password: string) => void;
    isLoading: boolean;
    emailError: boolean;
  }