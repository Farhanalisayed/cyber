'use client'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sun, Moon, CheckCircle } from "lucide-react";

export default function Advertise() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`min-h-screen min-w-[100vw] flex-1 flex flex-col items-center justify-center text-center ${isDarkTheme ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full transition-colors duration-300">
        
        {/* Header with Theme Toggle */}
        <header className="w-full flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Vendor Management</h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Button variant="ghost" onClick={toggleTheme} className="text-gray-500 dark:text-gray-400">
              {isDarkTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center mt-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            Simplify Your <span className="text-blue-600">Vendor Management</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-xl">
            A seamless and efficient way to manage your vendors, track their performance, and streamline your business operations.
          </p>
          <Button 
            className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg"
            onClick={() => navigate("/")}
          >
            Get Started
          </Button>
        </section>

        {/* Features Section */}
        <section className="mt-16 px-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Track Vendors", desc: "Easily manage and categorize all your vendors in one place." },
            { title: "Monitor Performance", desc: "Get insights on vendor performance and criticality levels." },
            { title: "Secure & Reliable", desc: "Built with security in mind to keep your data safe." },
          ].map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">{feature.desc}</CardContent>
            </Card>
          ))}
        </section>

        {/* Footer Section */}
        <footer className="mt-16 py-6 text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Vendor Management. All rights reserved.
        </footer>

      </div>
    </div>
  );
}
