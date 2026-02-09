"use client"

import { useState } from "react"
import { Upload, Check, AlertTriangle, Database } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ImportResults {
  success: boolean
  imported: {
    projects: number
    sites: number
    ideas: number
    tasks: number
    notes: number
    nowItems: number
    alerts: number
  }
  total: number
}

export default function MigratePage() {
  const [migrating, setMigrating] = useState(false)
  const [results, setResults] = useState<ImportResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasLocalStorageData, setHasLocalStorageData] = useState<boolean | null>(null)

  // Check for localStorage data
  const checkLocalStorageData = () => {
    if (typeof window === 'undefined') return false

    const storageKeys = [
      'command-center-projects',
      'command-center-sites',
      'command-center-ideas',
      'command-center-tasks',
      'command-center-notes',
      'command-center-now-items',
      'command-center-alerts',
    ]

    let totalItems = 0
    const data: any = {}

    storageKeys.forEach(key => {
      try {
        const item = localStorage.getItem(key)
        if (item) {
          const parsed = JSON.parse(item)
          if (Array.isArray(parsed) && parsed.length > 0) {
            totalItems += parsed.length
            // Map storage keys to expected API format
            const entityName = key.replace('command-center-', '').replace('now-items', 'nowItems')
            data[entityName] = parsed
          }
        }
      } catch (error) {
        console.error(`Error reading ${key}:`, error)
      }
    })

    setHasLocalStorageData(totalItems > 0)
    return { hasData: totalItems > 0, data, totalItems }
  }

  const handleMigrate = async () => {
    const localStorageCheck = checkLocalStorageData()
    
    if (!localStorageCheck || !localStorageCheck.hasData) {
      setError('No localStorage data found to migrate')
      return
    }

    setMigrating(true)
    setError(null)

    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localStorageCheck.data),
      })

      if (!response.ok) {
        throw new Error('Migration failed')
      }

      const results = await response.json()
      setResults(results)
      
      // Optionally clear localStorage after successful migration
      if (results.success && confirm('Migration successful! Clear localStorage data?')) {
        const storageKeys = [
          'command-center-projects',
          'command-center-sites',
          'command-center-ideas',
          'command-center-tasks',
          'command-center-notes',
          'command-center-now-items',
          'command-center-alerts',
        ]
        
        storageKeys.forEach(key => {
          localStorage.removeItem(key)
        })
      }
    } catch (error) {
      console.error('Migration error:', error)
      setError('Migration failed. Please try again or check the console for details.')
    } finally {
      setMigrating(false)
    }
  }

  // Check for localStorage data on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        checkLocalStorageData()
      }, 100)
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-background to-background dark:from-blue-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Database Migration</h1>
          <p className="text-muted-foreground mt-2">
            Import your existing localStorage data to the new database
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Migration Status
              </CardTitle>
              <CardDescription>
                Check and migrate your localStorage data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasLocalStorageData === null && (
                <div className="text-center py-4">
                  <Button onClick={checkLocalStorageData} variant="outline">
                    Check for localStorage Data
                  </Button>
                </div>
              )}

              {hasLocalStorageData === false && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <span>No localStorage data found</span>
                </div>
              )}

              {hasLocalStorageData === true && !results && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span>localStorage data detected</span>
                  </div>
                  
                  <Button 
                    onClick={handleMigrate} 
                    disabled={migrating}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {migrating ? 'Migrating...' : 'Start Migration'}
                  </Button>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              {results && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Migration Complete!</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Successfully imported {results.total} items
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Import Results</CardTitle>
                <CardDescription>
                  Details of what was imported
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {Object.entries(results.imported).map(([type, count]) => (
                    <div key={type} className="flex justify-between">
                      <span className="capitalize">
                        {type.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{results.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            After successful migration, you can continue using the app with your data now stored in the database.
          </p>
        </div>
      </div>
    </div>
  )
}