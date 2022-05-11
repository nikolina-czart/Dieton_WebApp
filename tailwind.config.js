module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow:{
        'basic': '0 4px 3px rgba(0, 0, 0, 0.07)',
      },
      spacing: {
        '30px': '30px',
        '50px': '50px',
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        blue: {
          100: '#2B255A',
          80: '#2B255ACC',
          60: '#2B255A99',
          10: '#2B255A1A'
        },
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'] 
      },
      fontSize: {
        small: ['14px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '23px'],
        calculator: ['30px', '30px'],
        create: ['40px', '47px'],
        xl: ['48px', '56px'],
      },
    },
    borderRadius: {
      'none': '0',
      '15': '15px',
      '20': '20px',
      '40': '40px',
      'full': '9999px'
    },
  },
  plugins: [],
}