import { lazy, Suspense, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getQueryStringValue } from "./utils/tools"
const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const Cart = lazy(() => import("./pages/Cart"));
const Other = lazy(() => import("./pages/Other"));
const Product = lazy(() => import("./pages/Product"));
const DYConfiguration = lazy(() => import("./pages/DYConfiguration"));


function App() {
  function useSectionId() {
    return useMemo(() => getQueryStringValue('sectionId'), []);
  }
  function useEnv() {
    return useMemo(() => { 
      const env = getQueryStringValue('env') || 'prod'

      return env;
    }, []);
  }
  function useReqContext() {
    return useMemo(() => { 
      const env = getQueryStringValue('env') || 'HOMEPAGE'

      return env;
    }, []);
  }
  // eslint-disable-next-line no-undef
  // const [recommendationContext] = useState(window.DY?.recommendationContext?.type || '');
  
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar
          sectionId={useSectionId()}
          env={useEnv()}
          recommendationContext={useReqContext()}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/other" element={<Other />} />
          <Route path="/dy" element={<DYConfiguration />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
