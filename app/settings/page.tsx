"use client"

import { PageLayout } from "@/components/page-layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Mail, 
  Globe, 
  Palette, 
  Bell, 
  Shield, 
  Key, 
  Lock,
  ChevronRight,
  Settings as SettingsIcon
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState(true)

  return (
    <PageLayout>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="h-9 w-9" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{t('settingsTitle')}</h1>
            <p className="text-sm text-muted-foreground">Manage your preferences</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t('settingsTitle')}</h2>
              <p className="text-sm text-muted-foreground">
                Customize your application experience
              </p>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{t('language')}</h3>
                <p className="text-sm text-muted-foreground">{t('selectLanguage')}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
                className="h-12 text-base font-medium"
              >
                <span className="mr-2">🇬🇧</span>
                {t('english')}
              </Button>
              <Button
                variant={language === 'ms' ? 'default' : 'outline'}
                onClick={() => setLanguage('ms')}
                className="h-12 text-base font-medium"
              >
                <span className="mr-2">🇲🇾</span>
                {t('malay')}
              </Button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Appearance</h3>
                <p className="text-sm text-muted-foreground">Customize your interface</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background">
                  <Palette className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{t('theme')}</div>
                  <div className="text-sm text-muted-foreground">Toggle dark mode</div>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <User className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Profile</h3>
                <p className="text-sm text-muted-foreground">Your account information</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                <div className="p-2 rounded-lg bg-background">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground">Name</div>
                  <div className="font-medium">Username</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                <div className="p-2 rounded-lg bg-background">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <div className="font-medium">user@example.com</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <p className="text-sm text-muted-foreground">Manage your alerts</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates and alerts</div>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Security</h3>
                <p className="text-sm text-muted-foreground">Protect your account</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Key className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Password</div>
                    <div className="text-sm text-muted-foreground">Last changed 30 days ago</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Not enabled</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>VM Route Management System v1.0.0</p>
        </div>
      </div>
    </PageLayout>
  )
}
