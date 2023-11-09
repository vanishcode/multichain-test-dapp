import Card from '@/components/Card';
import { ConnectButton } from '@mysten/wallet-kit';

export default function Connect() {
  return (
    <Card title="Connect">
      <ConnectButton />
    </Card>
  );
}
