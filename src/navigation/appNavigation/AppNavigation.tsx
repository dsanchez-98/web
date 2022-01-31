import React, { FC } from 'react'
import Reports, { REPORTS } from 'pages/reports'
import Customers, { CUSTOMER_LIST, PROVIDER_LIST } from 'pages/customers/list'
import Products, { PRODUCTS_LIST } from 'pages/products/list'
import Vouchers, { VOUCHERS_LIST } from 'pages/sales/vouchers/list'
import VoucherForm, { CREATE_VOUCHER, SHOW_VOUCHER } from 'pages/sales/vouchers/form'
import ProductsForm, { CREATE_PRODUCT, SHOW_PRODUCT } from 'pages/products/form'
import CustomerForm, {
  CREATE_CUSTOMER,
  SHOW_CUSTOMER,
  CREATE_PROVIDER,
  SHOW_PROVIDER
} from 'pages/customers/form'
import Route from 'components/navigation/Route'
import Devices, { DEVICES_LIST } from 'pages/devices/list'
import DevicesForm, { CREATE_DEVICE, SHOW_DEVICE } from 'pages/devices/form'
import PersonalInformation, {
  PERSONAL_INFORMATION
} from 'pages/account/personalInformation'
import AccountSettings, { ACCOUNT_SETTINGS } from 'pages/account/accountSettings'
import CurrentPlan, { CURRENT_PLAN } from 'pages/account/currentPlan'
import useTranslation from 'hooks/useTranslation'
import Navigation from 'components/navigation'
import MenuBase from 'navigation/appNavigation/MenuBase'
import Drawer from 'components/drawer'
import Settings, { SETTINGS } from 'pages/settings/settings'
import CompanySetup, { COMPANY_SETUP } from 'pages/enterprises/companySetup'
import Store, { STORE } from 'pages/enterprises/store'
import chooseAccount, { CHOOSEACC } from 'pages/account/chooseAccount'

// cashflow
import OpeningsList, { OPENINGS_LIST } from 'pages/cashFlow/openings/list'
import OpeningForm, { CREATE_OPENING, SHOW_OPENING } from 'pages/cashFlow/openings/form'

import IncomesList, { INCOMES_LIST } from 'pages/cashFlow/incomes/list'
import IncomeForm, { CREATE_INCOME, SHOW_INCOME } from 'pages/cashFlow/incomes/form'

import WithdrawalsList, { WITHDRAWALS_LIST } from 'pages/cashFlow/withdrawals/list'
import WithdrawalForm, {
  CREATE_WITHDRAWAL,
  SHOW_WITHDRAWAL
} from 'pages/cashFlow/withdrawals/form'

import CashDeskClosingForm, {
  CREATE_CASH_DESK_CLOSING,
  SHOW_CASH_DESK_CLOSING
} from 'pages/cashFlow/cashDeskClosings/form'
import CashDeskClosingList, {
  CASH_DESK_CLOSINGS_LIST
} from 'pages/cashFlow/cashDeskClosings/list'

interface Props {
  innerRef: any
}
const Routes = () => {
  const { t } = useTranslation()
  const reports = (
    <Route
      type="item"
      name={REPORTS}
      path="reports"
      options={{ title: t('reports'), icon: 'reports' }}
      component={Reports}
    />
  )
  const sales = (
    <Route
      type="group"
      path="sales"
      options={{
        title: t('sales'),
        icon: 'sales'
      }}
    >
      <Route
        type="item"
        name={VOUCHERS_LIST}
        path="vouchers"
        component={Vouchers}
        options={{
          title: t('saleVoucher')
        }}
      >
        <Route
          type="form"
          name={CREATE_VOUCHER}
          path="create-voucher"
          component={VoucherForm}
          options={{
            title: t('saleVoucherNew')
          }}
        />
        <Route
          type="form"
          name={SHOW_VOUCHER}
          path=":id"
          component={VoucherForm}
          options={{
            title: t('saleVoucherDet'),
            unmountOnBlur: true
          }}
        />
      </Route>
    </Route>
  )

  const products = (
    <Route
      type="item"
      name={PRODUCTS_LIST}
      path="products"
      component={Products}
      options={{
        title: t('products'),
        icon: 'products'
      }}
    >
      <Route
        type="form"
        name={CREATE_PRODUCT}
        path="create-product"
        options={{ title: t('productNew'), unmountOnBlur: true }}
        component={ProductsForm}
      />
      <Route
        type="form"
        name={SHOW_PRODUCT}
        path=":id"
        options={{ title: t('productShow'), unmountOnBlur: true }}
        component={ProductsForm}
      />
    </Route>
  )

  const customers = (
    <Route
      type="item"
      name={CUSTOMER_LIST}
      path="customers"
      component={Customers}
      options={{
        title: t('clients'),
        icon: 'clients'
      }}
    >
      <Route
        type="form"
        name={CREATE_CUSTOMER}
        path="create-customer"
        options={{ title: t('clientNew'), unmountOnBlur: true }}
        component={CustomerForm}
      />
      <Route
        type="form"
        name={SHOW_CUSTOMER}
        path=":id"
        options={{ title: t('clientShow'), unmountOnBlur: true }}
        component={CustomerForm}
      />
    </Route>
  )

  const providers = (
    <Route
      type="item"
      name={PROVIDER_LIST}
      path="providers"
      component={Customers}
      options={{
        title: t('providers'),
        icon: 'clients'
      }}
    >
      <Route
        type="form"
        name={CREATE_PROVIDER}
        path="create-provider"
        options={{ title: t('providerNew'), unmountOnBlur: true }}
        component={CustomerForm}
      />
      <Route
        type="form"
        name={SHOW_PROVIDER}
        path=":id"
        options={{ title: t('providerShow'), unmountOnBlur: true }}
        component={CustomerForm}
      />
    </Route>
  )

  const devices = (
    <Route
      type="item"
      name={DEVICES_LIST}
      path="devices"
      component={Devices}
      options={{
        title: t('printers'),
        icon: 'devices'
      }}
    >
      <Route
        type="form"
        name={CREATE_DEVICE}
        path="create-device"
        options={{ title: t('printerNew'), unmountOnBlur: true }}
        component={DevicesForm}
      />
      <Route
        type="form"
        name={SHOW_DEVICE}
        path=":id"
        options={{ title: t('printerShow'), unmountOnBlur: true }}
        component={DevicesForm}
      />
    </Route>
  )

  const account = (
    <>
      <Route
        type="form"
        name={PERSONAL_INFORMATION}
        path="my-account/personal-information"
        component={PersonalInformation}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
      <Route
        type="form"
        name={ACCOUNT_SETTINGS}
        path="my-account/account-settings"
        component={AccountSettings}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
      <Route
        type="form"
        name={CURRENT_PLAN}
        path="my-account/current-plan"
        component={CurrentPlan}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
    </>
  )

  const settings = (
    <>
      <Route
        type="form"
        name={SETTINGS}
        path="settings"
        component={Settings}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
    </>
  )

  const enterprises = (
    <>
      <Route
        type="form"
        name={COMPANY_SETUP}
        path="enterprise/setup"
        component={CompanySetup}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
      <Route
        type="form"
        name={STORE}
        path="store/:id"
        component={Store}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
    </>
  )

  const pickAccount = (
    <>
      <Route
        type="form"
        name={CHOOSEACC}
        path="my-account"
        component={chooseAccount}
        options={{
          title: t('printers'),
          unmountOnBlur: true
        }}
      />
    </>
  )

  const cashFlow = (
    <Route
      type="group"
      path="cash-flow"
      options={{
        title: t('cashFlow'),
        icon: 'sales'
      }}
    >
      <Route
        type="item"
        name={OPENINGS_LIST}
        path="openings"
        component={OpeningsList}
        options={{
          title: t('cashOpening')
        }}
      >
        <Route
          type="form"
          name={SHOW_OPENING}
          path=":id"
          component={OpeningForm}
          options={{
            title: t('cashOpening'),
            unmountOnBlur: true
          }}
        />
      </Route>
      <Route
        type="item"
        name={INCOMES_LIST}
        path="incomes"
        component={IncomesList}
        options={{
          title: t('cashIncomes')
        }}
      >
        <Route
          type="form"
          name={CREATE_INCOME}
          path="create"
          component={IncomeForm}
          options={{
            title: t('cashIncomes'),
            unmountOnBlur: true
          }}
        />
        <Route
          type="form"
          name={SHOW_INCOME}
          path=":id"
          component={IncomeForm}
          options={{
            title: t('cashIncomes'),
            unmountOnBlur: true
          }}
        />
      </Route>
      <Route
        type="item"
        name={WITHDRAWALS_LIST}
        path="withdrawals"
        component={WithdrawalsList}
        options={{
          title: t('cashWithdrawal')
        }}
      >
        <Route
          type="form"
          name={CREATE_WITHDRAWAL}
          path="create"
          component={WithdrawalForm}
          options={{
            title: t('cashWithdrawal'),
            unmountOnBlur: true
          }}
        />
        <Route
          type="form"
          name={SHOW_WITHDRAWAL}
          path=":id"
          component={WithdrawalForm}
          options={{
            title: t('cashWithdrawal'),
            unmountOnBlur: true
          }}
        />
      </Route>
      <Route
        type="item"
        name={CASH_DESK_CLOSINGS_LIST}
        path="cash-desk-closings"
        component={CashDeskClosingList}
        options={{
          title: t('cashDeskClosings')
        }}
      >
        <Route
          type="form"
          name={CREATE_CASH_DESK_CLOSING}
          path="create"
          component={CashDeskClosingForm}
          options={{
            title: t('cashDeskClosings'),
            unmountOnBlur: true
          }}
        />
        <Route
          type="form"
          name={SHOW_CASH_DESK_CLOSING}
          path=":id"
          component={CashDeskClosingForm}
          options={{
            title: t('cashDeskClosings'),
            unmountOnBlur: true
          }}
        />
      </Route>
    </Route>
  )
  return (
    <Route>
      {reports}
      {sales}
      {products}
      {customers}
      {devices}
      {providers}
      {cashFlow}
      {account}
      {settings}
      {enterprises}
      {pickAccount}
    </Route>
  )
}

const AppNavigation: FC<Props> = ({ innerRef }) => {
  return (
    <Navigation
      initialRouteName={VOUCHERS_LIST}
      innerRef={innerRef}
      wrapperComponent={({ children, routes, initialRouteName }) => {
        return (
          <Drawer
            initialRouteName={initialRouteName}
            drawerContent={(params) => <MenuBase {...params} routes={routes} />}
            children={children}
          />
        )
      }}
    >
      {Routes()}
    </Navigation>
  )
}
export default AppNavigation
