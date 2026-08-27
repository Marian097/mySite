import AuthPage from "./page/AuthPage.tsx";
import useAuthForm from "./hooks/useAuthForm.ts";
import useCharts from "./hooks/useCharts.ts";
import AdminPanel from "./page/AdminPanel.tsx";
import hooksWorker from "./hooks/useWorkers.ts";
import hooksPersonal from "./hooks/usePersonalForm.ts";
import hooksFiscal from "./hooks/useFiscalForm.ts";
import { Routes, Route } from "react-router";
import AccountSetup from "./page/AccountSetup.tsx";

function App() {
  const useAuth = useAuthForm();
  const useWorker = hooksWorker();
  const charts = useCharts();
  const personal = hooksPersonal();
  const fiscal = hooksFiscal();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthPage
              setIsLoggedForm={useAuth.setIsLoggedForm}
              message={useAuth.message}
              value={useAuth.values}
              errors={useAuth.errors}
              touched={useAuth.touched}
              isLoggedForm={useAuth.isLoggedForm}
              handleChange={useAuth.handleChange}
              handleBlur={useAuth.handleBlur}
              singUpProvider={useAuth.signUpProvider}
              errorsLogin={useAuth.errorsLogin}
              login={useAuth.login}
            />
          }
        />{" "}
        <Route
          path="/verificare-informații/*"
          element={
            <AccountSetup
              personalValues={personal.values}
              isSubmmitPersonalForm={personal.isSubmmitPersonalForm}
              counties={fiscal.counties}
              getCounties={fiscal.getCounties}
              updateStep={useAuth.updateStep}
              handleChange={personal.handleChange}
              handleSubmitIdentity={personal.handleSubmitIdentity}
              response={personal.response}
              isSteps={useAuth.isSteps}
              setIsSteps={useAuth.setIsSteps}
              fiscalValues={fiscal.values}
              handleChangeBussiness={fiscal.handleChange}
              handleSubmitFiscalData={fiscal.handleSubmitFiscalData}
            />
          }
        />
        <Route
          path="/panou-administrare"
          element={
            <AdminPanel
              error={useWorker.error}
              workers={useWorker.workers}
              getWorkers={useWorker.getWorkers}
              getWorkersPending={useWorker.getWorkersPending}
              getWorkersRejected={useWorker.getWorkersRejected}
              getWorkersApprove={useWorker.getWorkersApproved}
              getWorkersByEmail={useWorker.getWorkersByEmail}
              getWorkerByCI_expiring={useWorker.getWorkerByCI_expiring}
              email={useWorker.email}
              setEmail={useWorker.setEmail}
              setIsStatus={useWorker.setIsStatus}
              admin={useAuth.admin}
              countWorkers={useWorker.countWorkers}
              totalWorkers={useWorker.totalWorkers ?? 0}
              procent={useWorker.procent ?? 0}
              calculateProcent={useWorker.calculateProcent}
              procentApproved={useWorker.procentApproved ?? 0}
              approvedWorkers={useWorker.approvedWorkers ?? 0}
              calculateProcentApproved={useWorker.calculateProcentApproved}
              countWorkersApproved={useWorker.countWorkersApproved}
              rejectedWorkers={useWorker.rejectedWorkers ?? 0}
              procentRejected={useWorker.procentRejected ?? 0}
              countWorkersRejected={useWorker.countWorkersRejected}
              calculateProcentRejected={useWorker.calculateProcentRejected}
              pendingdWorkers={useWorker.pendingdWorkers ?? 0}
              procentPending={useWorker.procentPending ?? 0}
              countWorkersPending={useWorker.countWorkersPending}
              calculateProcentPending={useWorker.calculateProcentPending}
              data={charts.data}
              errCharts={charts.error}
              getStats={charts.getStats}
              handleAcceptUser={useWorker.handleAcceptUser}
              handleRejectUser={useWorker.handleRejectUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
