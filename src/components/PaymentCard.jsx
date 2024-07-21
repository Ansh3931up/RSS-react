

function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-lg rounded-lg ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children, className }) {
  return (
    <h3 className={`text-2xl font-bold ${className}`}>
      {children}
    </h3>
  );
}

function CardDescription({ children, className }) {
  return (
    <p className={`text-gray-600 ${className}`}>
      {children}
    </p>
  );
}

function Button({ children, variant, size }) {
  const baseStyle = 'px-4 py-2 rounded-md focus:outline-none';
  const variantStyle = variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white';
  const sizeStyle = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle}`}>
      {children}
    </button>
  );
}

const  PaymentCard=()=> {
  return (
    <Card className="w-full max-w-sm">
      <img src="/placeholder.svg" alt="Magazine Cover" width={400} height={300} className="rounded-t-lg object-cover" />
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <CardTitle>National Geographic</CardTitle>
          <CardDescription>Explore the wonders of the natural world with National Geographic magazine.</CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">$5.99</div>
          <Button variant="outline" size="sm">
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentCard;