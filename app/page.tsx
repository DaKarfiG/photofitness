'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Plus, User } from "lucide-react"

// Placeholder data
const initialFoodItems = [
  { name: 'Apple', calories: 95, carbs: 25, protein: 0.5, fat: 0.3 },
  { name: 'Chicken Breast', calories: 165, carbs: 0, protein: 31, fat: 3.6 },
]

export default function NutritionTracker() {
  const [user, setUser] = useState('')
  const [foodItems, setFoodItems] = useState(initialFoodItems)

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0)
  const totalCarbs = foodItems.reduce((sum, item) => sum + item.carbs, 0)
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0)
  const totalFat = foodItems.reduce((sum, item) => sum + item.fat, 0)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setUser(formData.get('username') as string)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {!user ? (
        <Card className="w-[350px] mx-auto mt-20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Nutrition Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-gray-400" />
                <Input name="username" placeholder="Enter your name" required className="flex-1" />
              </div>
              <Button type="submit" className="w-full">Start Tracking</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome, {user}!</h1>
            <Button variant="outline" onClick={() => setUser('')}>Logout</Button>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Macronutrient Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
  {/* Flex container for the circle and the legend */}
  <div className="flex justify-start items-center space-x-8"> {/* Adjust spacing between circle and legend */}
    {/* Circle Container */}
    <div className="relative w-64 h-64"> {/* Removed mx-auto to align left */}
      <svg viewBox="0 0 150 150" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20"
                strokeDasharray={`${(totalCarbs / (totalCarbs + totalProtein + totalFat)) * 251.2} 251.2`}
                transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="20"
                strokeDasharray={`${(totalProtein / (totalCarbs + totalProtein + totalFat)) * 251.2} 251.2`}
                strokeDashoffset={`${-(totalCarbs / (totalCarbs + totalProtein + totalFat)) * 251.2}`}
                transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="20"
                strokeDasharray={`${(totalFat / (totalCarbs + totalProtein + totalFat)) * 251.2} 251.2`}
                strokeDashoffset={`${-((totalCarbs + totalProtein) / (totalCarbs + totalProtein + totalFat)) * 251.2}`}
                transform="rotate(-90 50 50)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold">{totalCalories}</span>
        <span className="text-sm ml-1">kcal</span>
      </div>
    </div>

    {/* Legend Container */}
    <div className="flex flex-col space-y-2"> {/* Space between legend items */}
      <div className="flex items-center">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
        <span>Carbs</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
        <span>Protein</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
        <span>Fat</span>
      </div>
    </div>
  </div>
</CardContent>

            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Calories</TableCell>
                      <TableCell className="text-right">{totalCalories} kcal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Carbs</TableCell>
                      <TableCell className="text-right">{totalCarbs}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Protein</TableCell>
                      <TableCell className="text-right">{totalProtein}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fat</TableCell>
                      <TableCell className="text-right">{totalFat}g</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Food Items</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Food Item
                </Button>
                <Button size="sm" variant="outline">
                  <Camera className="mr-2 h-4 w-4" /> Add via Camera
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Calories</TableHead>
                    <TableHead className="text-right">Carbs</TableHead>
                    <TableHead className="text-right">Protein</TableHead>
                    <TableHead className="text-right">Fat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.calories} kcal</TableCell>
                      <TableCell className="text-right">{item.carbs}g</TableCell>
                      <TableCell className="text-right">{item.protein}g</TableCell>
                      <TableCell className="text-right">{item.fat}g</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}