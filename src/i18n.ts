import { ref } from 'vue';
import en from '@/store/en';
import vi from '@/store/vi';
import { useLanguageStore } from '@/store/language';
const translations = {
    en,
    vi,
};

export function translate(key: string): string {
    // Lấy bản dịch tương ứng dựa trên ngôn ngữ hiện tại và khóa
    const languageStore = useLanguageStore();
    const translation = translations[languageStore.currentLanguage][key];

    // Trả về bản dịch hoặc khóa nếu không tìm thấy bản dịch
    return translation || key;
}
