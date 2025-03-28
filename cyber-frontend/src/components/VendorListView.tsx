import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Moon, Sun, Search, Home, Users, FileText, Settings, LogOut } from "lucide-react";

export default function VendorListView() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", type: "", criticality: "", status: "", contact: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const response = await fetch("http://localhost:5000/vendors");
    const data = await response.json();
    setVendors(data);
  };

  const handleAddVendor = async () => {
    if (!newVendor.name || !newVendor.type || !newVendor.criticality || !newVendor.status || !newVendor.contact) {
      alert("All fields are required!");
      return;
    }
    const response = await fetch("http://localhost:5000/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVendor),
    });
    const data = await response.json();
    setVendors([...vendors, data]);
    setNewVendor({ name: "", type: "", criticality: "", status: "", contact: "" });
    setShowForm(false);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", { method: "POST" });
    navigate("/advertise");
  };

  const filteredVendors = vendors.filter((vendor) =>
    ["name", "type", "criticality", "status", "contact"].some((key) =>
      vendor[key].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={`min-h-screen w-[100vw] ${isDarkTheme ? "dark" : ""}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 w-64 min-h-screen p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full text-white hover:text-white hover:border-white justify-start" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full text-white hover:text-white hover:border-white justify-start" onClick={() => navigate("/vendors")}>
              <Users className="mr-2 h-4 w-4" />
              Vendors
            </Button>
          </nav>
          <div className="absolute bottom-4">
            <Button variant="ghost" className="w-full text-white hover:text-white hover:border-white justify-start text-red-600 dark:text-red-400"
                    onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex flex-row items-center justify-between border-b dark:border-gray-700">
              <CardTitle className="text-2xl m-4 font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
              <div className="flex items-center m-4 space-x-2">
                <Sun className="h-4 w-4 text-gray-900 dark:text-gray-500" />
                <Switch checked={isDarkTheme} onCheckedChange={() => setIsDarkTheme(!isDarkTheme)} />
                <Moon className="h-4 w-4 text-gray-400 dark:text-gray-300" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                  <Input type="text" placeholder="Search vendors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <Search className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button onClick={() => setShowForm(true)} className="bg-blue-700 hover:bg-blue-800 text-white">
                  Add New Vendor
                </Button>
              </div>
              {showForm && (
                <div className="bg-gray-200 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-bold">Add New Vendor</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {["name", "type", "criticality", "status", "contact"].map((field) => (
                      <Input key={field} placeholder={field} value={newVendor[field]} onChange={(e) => setNewVendor({ ...newVendor, [field]: e.target.value })} />
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button onClick={() => setShowForm(false)} className="bg-gray-500 hover:bg-gray-600 text-white">
                      Cancel
                    </Button>
                    <Button onClick={handleAddVendor} className="bg-green-700 hover:bg-green-800 text-white">
                      Submit
                    </Button>
                  </div>
                </div>
              )}
              <Table>
                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>{vendor.type}</TableCell>
                      <TableCell><Badge>{vendor.criticality}</Badge></TableCell>
                      <TableCell><Badge>{vendor.status}</Badge></TableCell>
                      <TableCell>{vendor.contact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
