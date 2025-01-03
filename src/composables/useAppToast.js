import { useToast } from 'vue-toastification';

export const useAppToast = () => {
  const toast = useToast();

  return {
    toastSuccess: ({ title, description }) => {
      toast.success(`${title} - ${description}`, {
        icon: '✅',
      });
    },
    toastError: ({ title, description }) => {
      toast.error(`${title} - ${description}`, {
        icon: '❌',
      });
    },
  };
};
