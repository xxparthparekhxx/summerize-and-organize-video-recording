import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'rgb(0 0 0)',
  			foreground: 'rgb(255 255 255)',
  			card: {
  				DEFAULT: 'rgba(255, 255, 255, 0.05)',
  				foreground: 'rgb(255 255 255)'
  			},
  			primary: {
  				DEFAULT: 'rgb(255 255 255)',
  				foreground: 'rgb(0 0 0)'
  			},
  			secondary: {
  				DEFAULT: 'rgba(255, 255, 255, 0.1)',
  				foreground: 'rgba(255, 255, 255, 0.8)'
  			},
  			muted: {
  				DEFAULT: 'rgba(255, 255, 255, 0.1)',
  				foreground: 'rgba(255, 255, 255, 0.6)'
  			},
			  accent: {
				DEFAULT: 'rgba(255, 255, 255, 0.05)',
				foreground: 'rgb(255 255 255)',
				hover: 'rgba(255, 255, 255, 0.1)'
			  },
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
			  border: 'rgba(255, 255, 255, 0.1)',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
