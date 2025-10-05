import { Link } from "react-router-dom";

const NotFound = () => {


  return (<div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl text-foreground">Oops! Page not found</p>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <Link to="/" className="inline-block text-primary underline hover:text-primary/80 transition-colors">
          Return to Home →
        </Link>
      </div>
    </div>);
};

export default NotFound;
