// import SignUpForm from "./(dashboard)/dashboard/register/page";

// export default function Home() {
//   return (
//     <div>
//       <SignUpForm />
//     </div>
//   );
// }
import SignUpForm from "./(dashboard)/dashboard/register/page";
import { CartProvider } from "./(pwa)/pwa/context/CartProvider"; // Updated import

export default function Home() {
  return (
    <CartProvider>
      <div>
        <SignUpForm />
      </div>
    </CartProvider>
  );
}
