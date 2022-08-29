const planProfiles = [
  {
    name: 'Free Trial',
    descriptions: 'Get the free trial for some days and see if you want to keep going',
    color: 'danger',
    duration: 7, // days
    price: {
      USD: 0,
      EUR: 0,
      GBP: 0,
      NGN: 0,
    },
    features: {
      Banks: {
        NGN: true,
        USD: false,
        GBP: false,
        EUR: false,
      },
      Incorporation: {
        Nigeria: true,
        Ghana: false,
        Kenya: false,
        'South Africa': false,
        'Delaware USA': false,
      },
      'Charts & KPIs': {
        Capital: true,
        'Monthly Revenue vs Expenses': true,
        'Use of Funds': true,
        'Cash in the Bank': true,
      },
    },
  },
  {
    name: 'Basic',
    descriptions: 'Consists of all the basic features',
    color: 'warning',
    duration: 31, // days
    price: {
      USD: 20,
      EURO: 20,
      GBP: 20,
      NGN: 12500,
    },
    features: {
      Banks: {
        NGN: true,
        USD: false,
        GBP: false,
        EUR: false,
      },
      Incorporation: {
        Nigeria: true,
        Ghana: false,
        Kenya: false,
        'South Africa': false,
        'Delaware USA': false,
      },
      'Charts & KPIs': {
        Capital: true,
        'Monthly Revenue vs Expenses': true,
        'Use of Funds': true,
        'Cash in the Bank': true,
      },
    },
  },
  {
    name: 'Classic',
    descriptions: 'Consists of some of our more advanced features',
    color: 'info',
    duration: 31, // days
    price: {
      USD: 50,
      EURO: 50,
      GBP: 50,
      NGN: 25000,
    },
    features: {
      Banks: {
        NGN: true,
        USD: false,
        GBP: false,
        EUR: false,
      },
      Incorporation: {
        Nigeria: true,
        Ghana: false,
        Kenya: false,
        'South Africa': false,
        'Delaware USA': false,
      },
      'Charts & KPIs': {
        Capital: true,
        'Monthly Revenue vs Expenses': true,
        'Use of Funds': true,
        'Cash in the Bank': true,
      },
    },
  },
  {
    name: 'Premium',
    descriptions: 'This gives you access to all the amazing features of this application',
    color: 'success',
    duration: 31, // days
    price: {
      USD: 100,
      EURO: 100,
      GBP: 100,
      NGN: 50000,
    },
    features: {
      Banks: {
        NGN: true,
        USD: false,
        GBP: false,
        EUR: false,
      },
      Incorporation: {
        Nigeria: true,
        Ghana: false,
        Kenya: false,
        'South Africa': false,
        'Delaware USA': false,
      },
      'Charts & KPIs': {
        Capital: true,
        'Monthly Revenue vs Expenses': true,
        'Use of Funds': true,
        'Cash in the Bank': true,
      },
    },
  },
]

export default planProfiles
