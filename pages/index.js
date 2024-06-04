import { useRouter } from "next/router";
import { format } from "url";

let counter = 0;

export async function getServerSideProps() {
  counter++;
  return { props: { initialPropsCounter: counter } };
}

export default function Index({ initialPropsCounter }) {
  const router = useRouter();
  const { pathname } = router; // Only need pathname here

  const handleAboutClick = () => {
    router.push('/about'); // Simulate "About" click for conditional rendering
  };

  const reload = () => {
    router.push(format({ pathname }));
  };
  const incrementCounter = () => {
    const currentCounter = router.query.counter ? parseInt(router.query.counter) : 0;
    const href = `/?counter=${currentCounter + 1}`;

    router.push(href, href, { shallow: true }); // Try shallow routing (optional)
  };

  return (
    <div>
      <h2>This is the Home Page</h2>
      {pathname === '/about' && ( // Render About content conditionally
        <div>
          <h1>About Us</h1>
          {/* Your About page content goes here */}
        </div>
      )}
      <button onClick={handleAboutClick}>About</button>
      {/* No Link component needed here */}
      <button onClick={reload}>Reload</button>
      <button onClick={incrementCounter}>Change State Counter</button>
      <p>"getServerSideProps" ran for "{initialPropsCounter}" times.</p>
      <p>Counter: "{router.query.counter || 0}".</p>
    </div>
  );
}
