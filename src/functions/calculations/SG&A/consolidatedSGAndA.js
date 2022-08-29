import { totalCols } from '..'
import { totalAdvisoryAndProf } from './advisoryAndProfServices'
import { totalInsuranceExpenses } from './insurance'
import { totalMarketingAndGrowth } from './marketingAndGrowth'
import { totalOtherExpenses } from './otherExpenses'
import { totalPayroll } from './payroll'
import { totalRentExpenses } from './rent'
import { totalTechSupportAndServicesExpenses } from './techSupportAndServices'
import { totalUtilitiesExpenses } from './utilities'

export const consolidatedSGAandA = {
  payroll: totalPayroll,
  marketingAndGrowth: totalMarketingAndGrowth,
  advisoryAndProfServices: totalAdvisoryAndProf,
  rent: totalRentExpenses,
  techSupportAndServices: totalTechSupportAndServicesExpenses,
  insurance: totalInsuranceExpenses,
  utilities: totalUtilitiesExpenses,
  otherExpenses: totalOtherExpenses,
  total: (props) =>
    totalCols([
      totalPayroll(props),
      totalMarketingAndGrowth(props),
      totalAdvisoryAndProf(props),
      totalRentExpenses(props),
      totalTechSupportAndServicesExpenses(props),
      totalInsuranceExpenses(props),
      totalUtilitiesExpenses(props),
      totalOtherExpenses(props),
    ]),
}
