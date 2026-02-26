// Google Sign-In Type Definitions

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface GoogleAccounts {
  id: {
    initialize: (config: {
      client_id: string;
      callback: (response: GoogleCredentialResponse) => void;
      auto_select?: boolean;
      cancel_on_tap_outside?: boolean;
    }) => void;
    prompt: (momentListener?: (notification: any) => void) => void;
    renderButton: (
      parent: HTMLElement,
      options: {
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        size?: 'large' | 'medium' | 'small';
        type?: 'standard' | 'icon';
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
        logo_alignment?: 'left' | 'center';
        width?: number;
        locale?: string;
      }
    ) => void;
    disableAutoSelect: () => void;
    storeCredential: (credential: { id: string; password: string }) => void;
    cancel: () => void;
    revoke: (hint: string, callback: (done: any) => void) => void;
  };
}

interface Window {
  google?: {
    accounts: GoogleAccounts;
  };
}
