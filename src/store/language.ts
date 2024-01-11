//src/store/language.ts
import { defineStore } from 'pinia';

interface LanguageState {
    currentLanguage: string;
}

export const useLanguageStore = defineStore('language', {
    state: (): LanguageState => ({
        currentLanguage: 'vi', // Ngôn ngữ mặc định
    }),
    actions: {
        setCurrentLanguage(language: string) {
            this.currentLanguage = language;
        },
    },
});