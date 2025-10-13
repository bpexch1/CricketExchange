import OddsButton from '../OddsButton';

export default function OddsButtonExample() {
  return (
    <div className="flex gap-4 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Back Odds</p>
        <OddsButton type="back" odds={1.85} stake={50000} onClick={() => console.log('Back clicked')} />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Lay Odds</p>
        <OddsButton type="lay" odds={1.90} stake={25000} onClick={() => console.log('Lay clicked')} />
      </div>
    </div>
  );
}
