import Sing_up from "./page/Sing_up";
import useAuthForm from "./hooks/useAuthForm.ts";
import Header from "./components/Header.tsx";
import AdminPanel from "./page/AdminPanel.tsx";
import hooksWorker from "./hooks/useWorkers.ts";
// import ExplorePage from "./page/ExplorePage.tsx";

function App() {
  const render = useAuthForm();
  const workers = hooksWorker();
  return (
    <>
      <Header
        setIsSingUp={render.setIsSignUp}
        setIsDropdown={render.setIsDropdown}
        isDropdown={render.isDropdown}
      />
      {render.logged_in ? (
        <>
          {" "}
          <AdminPanel
            error={workers.error}
            workers={workers.workers}
            getWorkers={workers.getWorkers}
            getWorkersPending = {workers.getWorkersPending}
            getWorkersRejected = {workers.getWorkersRejected}
            getWorkersApprove = {workers.getWorkersApproved}
            getWorkersByEmail = {workers.getWorkersByEmail}
            getWorkerByCI_expiring = {workers.getWorkerByCI_expiring}
            email = {workers.email}
            setEmail = {workers.setEmail}
            setIsStatus = {workers.setIsStatus}
            admin = {render.admin}
            countWorkers = {workers.countWorkers}
            totalWorkers = {workers.totalWorkers ?? 0}
            procent = {workers.procent ?? 0}
            calculateProcent = {workers.calculateProcent}
          />
        </>
      ) : (
        <>
          <Sing_up
            message={render.message}
            isSingUp={render.isSignUp}
            value={render.values}
            errors={render.errors}
            touched={render.touched}
            handleChange={render.handleChange}
            handleBlur={render.handleBlur}
            singUp={render.signUp}
            login={render.login}
            isLoggedForm={render.isLoggedForm}
            setIsLoggedForm={render.setIsLoggedForm}
            errorsLogin={render.errorsLogin}
          />
        </>
      )}

      {/* <ExplorePage /> */}
    </>
  );
}

export default App;
