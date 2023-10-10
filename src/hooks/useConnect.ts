import { useMount } from 'ahooks';

export default function useConnect() {
  useMount(() => {
    window.okxwallet?.enable();
  });
}
