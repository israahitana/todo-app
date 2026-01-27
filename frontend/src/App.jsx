import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Register from "./pages/Register";
import HomeTasks from "./pages/HomeTasks";
import Login from "./pages/Loginn";
import ProtectedRoute from "./components/ProtectedRoute";
import CompletedTasks from "./pages/CompletedTasks";
import TasksAFaire from "./pages/TasksAFaire";
import TasksEnCours from "./pages/TasksEnCours";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <HomeTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <CompletedTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/a-faire"
          element={
            <ProtectedRoute>
              <TasksAFaire />
            </ProtectedRoute>
          }
        />

        <Route
          path="/en-cours"
          element={
            <ProtectedRoute>
              <TasksEnCours />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;