import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';


export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);

  useEffect(() => {
    if (session?.user?.isAdmin) {
      fetchAdminEmails();
    }
  }, [session]);

  const fetchAdminEmails = async () => {
    try {
      const response = await fetch('/api/admin');
      if (response.ok) {
        const data = await response.json();
        setAdminEmails(data.adminEmails);
      } else {
        console.log('Failed to fetch admin emails.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: adminEmail }),
      });

      if (response.ok) {
        setAdminEmail('');
        alert('Admin email added successfully!');
        fetchAdminEmails(); // Refresh the admin emails list
      } else {
        alert('Failed to add admin email.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding admin email.');
    }
  };

  const handleDeleteAdmin = async (email) => {
    try {
      const response = await fetch(`/api/admin/${email}`, {
        method: 'DELETE',
      });
      console.log(response)
      if (response.ok) {
        alert('Admin email deleted successfully!');
        fetchAdminEmails(); // Refresh the admin emails list
      } else {
        alert('Failed to delete admin email.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting admin email.');
    }
  };

  if (sessionStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to sign in to access this page.</p>;
  }

  if (!session.user.isAdmin) {
    return <p>Access denied. You are not an admin.</p>;
  }

  return (
    <Layout>
      
      <div>
        <h1>Admin Page</h1>
        <div>
          <h2>Add Admin Email</h2>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAddAdmin}>Add Admin</button>
        </div>
     
        <div >
        <table className="basic mt-2">
  <thead>
    <tr>
      <td>Admin emails</td>
      <td></td>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="2">Loading admin emails...</td>
      </tr>
    ) : (
      adminEmails.map((email) => (
        <tr key={email}>
          <td>{email}</td>
          <td className="text-right">
            <button className="btn-red" onClick={() => handleDeleteAdmin(email)}>
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

        </div>
        
      </div>
      
      
    </Layout>
  );
}




