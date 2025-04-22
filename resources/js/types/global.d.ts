import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
    namespace YT {
        class Player {
            destroy(): void;
            playVideo(): void;
        }
    }
    
    interface Window {
        YT: {
            Player: new (
                elementId: string,
                config: {
                    videoId: string;
                    height: string | number;
                    width: string | number;
                    playerVars?: Record<string, number | boolean>;
                    events?: {
                        onReady?: () => void;
                        onStateChange?: (event: { data: number }) => void;
                    };
                }
            ) => YT.Player;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

export {};
