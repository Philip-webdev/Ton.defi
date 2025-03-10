
    interface Window {
        ethereum?: any;  
    }

   
 declare global {
      interface Window {
            Telegram: {
                      WebApp: {
                                openTelegramLink: (url: string) => void;
                                        expand: () => void;
                                                close: () => void;
                                                        initData: string;
                                                                initDataUnsafe: object;
                      };
                    };
                }
            }
     