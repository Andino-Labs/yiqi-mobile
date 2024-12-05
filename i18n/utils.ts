import {useTranslation} from "react-i18next";
import * as SecureStore from "expo-secure-store";
import {Language} from "./resources";
import {useCallback} from "react";
import {secureStorageKeys} from "@/constants/SecureStore";

export const useSelectedLanguage = () => {
  const {i18n} = useTranslation();
  const currentLanguage = i18n.language;

  const setLanguage = useCallback(
    async (lang: Language) => {
      await SecureStore.setItemAsync(secureStorageKeys.LANGUAGE, lang);
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return {language: currentLanguage as Language, setLanguage};
};
