import axios from "axios";

const API_URL = "http://your-api-url/admin/users"; // Replace with actual API URL

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json"
});

const AdminService = {
  getUserCountByRole: async (role) => {
    try {
      const response = await axios.get(`${API_URL}?role=${role}`, {
        headers: getAuthHeaders(),
      });
      return response.data.data.length; // Assuming API returns a list of users
    } catch (error) {
      console.error("Error fetching user count:", error);
      return 0;
    }
  },

  getAllUserCounts: async () => {
    try {
      const [mentors, students, admins] = await Promise.all([
        AdminService.getUserCountByRole("MENTOR"),
        AdminService.getUserCountByRole("STUDENT"),
        AdminService.getUserCountByRole("ADMIN"),
      ]);

      return { mentors, students, admins };
    } catch (error) {
      console.error("Error fetching user counts:", error);
      return { mentors: 0, students: 0, admins: 0 };
    }
  },
};

export default AdminService;