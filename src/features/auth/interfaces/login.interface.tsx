export interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  emailError: boolean;
}
