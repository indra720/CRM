'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, MinusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"

const users = [
  { id: 1, name: "Liam Johnson", email: "liam@example.com", role: "Admin", status: "Active", avatar: "https://picsum.photos/seed/1/40/40" },
  { id: 2, name: "Olivia Smith", email: "olivia@example.com", role: "Team Leader", status: "Active", avatar: "https://picsum.photos/seed/2/40/40" },
  { id: 3, name: "Noah Williams", email: "noah@example.com", role: "Staff", status: "Inactive", avatar: "https://picsum.photos/seed/3/40/40" },
  { id: 4, name: "Emma Brown", email: "emma@example.com", role: "Staff", status: "Active", avatar: "https://picsum.photos/seed/4/40/40" },
  { id: 5, name: "Oliver Jones", email: "oliver@example.com", role: "Admin", status: "Active", avatar: "https://picsum.photos/seed/5/40/40" },
];

export default function UsersPage() {
  const [expandedRows, setExpandedRows] = React.useState(new Set<number>());

  const toggleExpanded = (id: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
        <div className="ml-auto">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            A list of all users in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] hidden lg:table-cell"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <React.Fragment key={user.id}>
                  <TableRow>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center">
                        <span className="hidden lg:inline">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <button
                          className="ml-2 inline-flex lg:hidden"
                          onClick={() => toggleExpanded(user.id)}
                        >
                          {expandedRows.has(user.id) ? (
                            <MinusCircle className="h-5 w-5 text-green-300" />
                          ) : (
                            <PlusCircle className="h-5 w-5 text-green-300" />
                          )}
                        </button>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === 'Active' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(user.id) && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <p className="font-semibold">Status</p>
                              <p>{user.status}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Email</p>
                              <p>{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}