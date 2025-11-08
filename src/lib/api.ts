export async function toggleUserActiveStatus(
  userId: number,
  userType: string,
  isActive: boolean
): Promise<void> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const requestData = {
    user_id: userId,
    user_type: userType,
    is_active: isActive,
  };

  console.log("=== TOGGLE API CALL ===");
  console.log("Request Data:", requestData);
  console.log("API URL:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/toggle-active/`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/toggle-active/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    console.log("API Response Status:", response.status);
    console.log("API Response OK:", response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("API Error Response:", errorData);
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    console.log("=== TOGGLE API SUCCESS ===");
    // No need to return anything specific, just resolve if successful
  } catch (error: any) {
    console.error("=== TOGGLE API ERROR ===");
    console.error("Failed to toggle user status:", error);
    throw new Error(
      `Failed to toggle user status: ${error.message || "Unknown error"}`
    );
  }
}


// Funtion to fetch admin leads by tag because it's a same api call as the one used in the AdminLeadTable component.
export async function fetchAdminLeadsByTag(tag: string): Promise<{ staff_leads: any[]; team_leads: any[] }> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/admin-leads/${tag}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Failed to fetch leads for tag ${tag}:`, error);
    throw new Error(
      `Failed to fetch leads: ${error.message || "Unknown error"}`
    );
  }
}

//  Funciton to fethch all admins cards 
export async function fetchAdmins(): Promise<any[]> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/dashboard/super-admin/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.users || [];
  } catch (error: any) {
    console.error('Failed to fetch admins:', error);
    throw new Error(
      `Failed to fetch admins: ${error.message || "Unknown error"}`
    );
  }
}


//  function to fetch superuser staff leads by tag.
export async function fetchSuperuserStaffLeadsByTag(tag: string): Promise<any> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/superuser/staff-leads/${tag}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Failed to fetch superuser staff leads for tag ${tag}:`, error);
    throw new Error(
      `Failed to fetch superuser staff leads: ${error.message || "Unknown error"}`
    );
  }
}


// function to fetch teamleader edit api call.
export async function editTeamLeader(id: number, formData: any): Promise<any> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/users/team-leader/edit/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to edit team leader:", error);
    throw new Error(
      `Failed to edit team leader: ${error.message || "Unknown error"}`
    );
  }
}

export async function fetchAdminsForSelection(): Promise<any[]> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/dashboard/super-admin/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.users || [];
  } catch (error: any) {
    console.error('Failed to fetch admins:', error);
    throw new Error(`Failed to fetch admins: ${error.message || "Unknown error"}`);
  }
}

export async function fetchTeamLeaders(): Promise<any[]> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/api/superuser/get-team-leaders/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error: any) {
    console.error('Failed to fetch team leaders:', error);
    throw new Error(`Failed to fetch team leaders: ${error.message || "Unknown error"}`);
  }
}
