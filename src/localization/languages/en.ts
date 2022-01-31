import { Languages } from './types'

const en: Languages = {
  yes: 'Yes',
  no: 'No',
  hola: 'hello',
  yaFaltaPoco: 'Almost there!',
  verifica: 'Verify your cell number',
  click: 'By clicking next, a code will be sent to you via SMS to confirm your number.',
  listo: 'Ready!',
  emailAdvice:
    "If you can't find the email, don't forget to check for spam and junk emails. May that you find it there",
  volver: 'Back',
  clickOnReady: 'Click on enter to start setup your company data',
  ingresar: 'Enter',
  enviado: 'We have sent you a code via SMS to',
  siguiente: 'Next',
  podrasPedir: 'You could request a new code at',
  segundos: 'seconds',
  hazClickCambiar: 'Click here to change your number',
  hazClickCodigo: 'Click here to resend code.',
  hazClickEnlace: 'Click on the link that we send to "',
  paraEmpezar: '" to start using Tumisoft.',
  recuperarContraseña: 'Recover password',
  ingresaTuCorreoTumisoft:
    'Enter the email of your TumiSoft account and we will send you instructions to reset your password.',
  ingresaTuCorreo: 'Enter your email',
  send: 'Send',
  correoDebeTenerDominio:
    'Your email must have @ and a domain. Ex.: examplejemplo@gmail.com',
  correoRequerido: 'Email is required',
  cancel: 'Cancel',
  description: 'Description',
  update: 'Update',
  invite: 'Invite',

  /// COMPONENTS
  compDropDef: 'Default',
  compCropReady: 'Ready',
  compCropRotLeft: 'Rotate left',
  compCropRotRight: 'Rotate right',
  compModalPhotoDrag: 'Drag the photo here or',
  compModalPhotoClick: 'click',
  compModalAccept: 'Accept',
  compModalCancel: 'Cancel',
  compSecurityLevel: 'Password security level',
  compSecurityLow: 'Low',
  compSecurityMed: 'Medium',
  compSecurityHigh: 'High',
  compSecurityValOne: 'At least 8 characters',
  compSecurityValTwo: 'At least one special character (#$%)',
  compSecurityValThree: 'At least one capital letter',
  compSecurityValFour: 'At least one lowercase letter',
  compSecurityValFive: 'At least one number',

  /// ACCOUNT SETTINGS
  accSettingsPass: 'Password',
  accSettingsChangeYourPass: 'Change your password.',
  accSettingsPassActual: 'Current password',
  accSettingsNewActual: 'New current',
  accSettingsRepeatActual: 'Repeat current',
  accSettingsChangePass: 'Change password',
  accSettingsChangeYourEmail: 'Change your email',
  accSettingsChangeEmail: 'Change email',
  accSettingsEmail: 'Mail',

  /// CHOOSEACCOUNT
  chooseAccMyAcc: 'My account',
  chooseAccChoose: 'Choose account',
  chooseAccEnter: 'Choose the business you want to enter:',
  chooseAccBtnBussi: 'Create New Business',
  chooseAccMail: 'Email',
  chooseAccPass: 'Password',
  chooseAccConn: 'Connect to social networks',
  chooseAccGo: 'Go',
  chooseAccChange: 'Change',
  chooseAccLastTime: 'Last time changed:',
  choosePanelTitle: 'Connect to Social Networks',
  choosePanelText: 'Connect your accounts to be able to enter through them more quickly.',
  choosePanelFacebook: 'Connect with Facebook',
  choosePanelGoogle: 'Connect with Google',

  /// LOGIN
  loginEnterTumi: 'Login to Tumisoft',
  loginOrUseYour: 'or use your email',
  loginEnterYourMail: 'Enter your email',
  loginEnterYourPass: 'Enter your password',
  loginRememberMe: 'Remember me',
  loginForgetPass: 'Did you forget your password?',

  /// RECOVER PASSWORD
  recoverValPassOne: 'Your password must have a minimum of 8 characters.',
  recoverValPassTwo: 'At least one special character',
  recoverValPassThree: 'At least one capital letter',
  recoverValPassFour: 'At least one lowercase letter',
  recoverValPassFive: 'At least one number',
  recoverValPassReq: 'Password is required',
  recoverValConfirmPass: 'Passwords do not match. Try again.',
  recoverValEmail: 'Your email must have @ and a domain. Ex: example@gmail.com',
  recoverValEmailReq: 'Email is required',
  recoverNewPass: 'New Password',
  recoverEnterNewPass: 'Enter your new password',
  recoverConfirmPass: 'Confirm your new password',
  recoverRestorePass: 'Restore password',

  /// MESSAGE VALIDATE ACCOUNT
  messageValAcc: 'You are one step away!',
  messageValClickLinkOne: 'Click on the link we send to ',
  messageValClickLinkTwo: 'to change your password.',
  messageValClickLinkThree: 'to start using TumiSoft.',
  messageValIfNot:
    "If you can't find the email, don't forget to check your spam and junk mail. You may find it there.",

  /// SUCCESS RECOVER PASS
  successRecoverPass: 'Your account password has been changed successfully. ',

  /// SEND SMS CODE
  sendSmsCodeValOne: 'Cell number required',
  sendSmsCodeValTwo: 'Invalid cell phone number',
  sendSmsCodePhone: 'Cell phone',
  sendSmsCodeGetOut: 'Get out',

  /// CASH FLOW
  /// LIST
  cashFlowIncoListModalTitle: 'New money income',
  cashFlowIncoListModalBody:
    'Here you can register income to correct your cash opening or simply register another type of income to your cash register.',
  cashFlowIncoListBtn: 'Create',

  /// OPENINGS LIST
  cashFlowOpListModalTitle: 'New Cash Opening',
  cashFlowOpListModalBody:
    'Enter the amount with which you will open your box. If you made a mistake, you can correct it from “entry” or “opening”.',
  cashFlowOpListBtn: 'Create',

  /// WITHDRAWALS LIST
  cashFlowWithListModalTitle: 'New Withdrawal of money',
  cashFlowWithListModalBody: 'Maximum amount to withdraw: S/5204.10',
  cashFlowWithListBtn: 'Create',

  /// SETTINGS
  settingsNotify: 'Notifications',
  settingsActivity: 'Activity',
  settingsActSession: 'Active sessions',
  settingsLocation: 'Location',

  /// FIRSTSTEPS
  firstStepsTitle: 'First steps',
  firstStepsUserTitle: 'User',
  firstStepsEnterTitle: 'Enterprise',
  firstStepsStoreTitle: 'Store',
  firstStepsComplete: 'Complete the information to continue',
  firstStepsConfigInit: 'Initial setup',

  /// CONFIGURATION
  /// STORE
  storeData: 'Store details',
  storeName: "Store's name",
  storeAddress: 'Address',
  storePhone: 'Phone',
  storeSeriesCorrelatives: 'Series and Correlatives',
  storePopOverOne:
    "You will only be able to use Sales Note until your SUNAT verification is complete. If you want to modify the series later you can do it from 'My account / Company / Store'.",
  storePopOverTwo:
    'These data will be sent to SUNAT. If they are not correct, the electronic documents you issue will be rejected',
  storeSeCoAlready: 'I have already worked with electronic invoicing before',
  storeSeries: 'Series',
  storeCorrelatives: 'Correlatives',
  storeUsers: 'Users',
  storePopOverUsers:
    'Here you can assign the users who will be administrators and sellers!',
  storeInviteUsers: 'Invite Users',
  storeTaxesTitle: 'Taxes for this store',
  storePayTitle: 'Payment types',
  storeMessageTicket: 'Printed ticket message',
  storeMessagePopOver: 'The message will appear in the gray area.',
  storeControlsTitle: 'Controls',
  storeControlEnabled: 'Enabled shop',
  storeControlDeleted: 'Delete store',

  /// INVITE USER MODAL
  storeUserModalTitle: 'Invite users by email',
  storeUserModalText:
    'An email will be sent through which the same user can register. The information will be updated when you start your first session.',
  storeUserModalMail: 'Email(s)',
  storeUserModalRoles: 'Role(s)',
  storeUserModalStoreCash: 'Store/Cash',
  storeUserModalTextTwo:
    'Enable registration by domain. (All emails that have the same domain as the email sent, upon registration will be added to your team with the role of seller)',
  /// DELETE USER MODAL
  storeUserDelTitle: 'Is it just a see you later?',
  storeUserDelMess:
    'You will remove this user from the store, if you want to permanently delete it you must do it from "Users".',
  storeUserDelQuit: 'Put off',
  /// STATUS USER MODAL
  storeUserStatusTitle: 'Houston, we have a problem!',
  storeUserStatusMess:
    'You cannot deactivate the only user of the store. You must first create a new one to deactivate this user.',
  storeUserStatusTitleTwo: 'Deactivate user',
  storeUserStatusMessTwo:
    'Deactivating this user will automatically close their active sessions. Are you sure you want to deactivate',
  storeUserStatusMessThree: '" as administrator?',
  storeUserStatusDeact: 'Deactivate',

  /// MENUBASE
  /// HEADER
  haveVoucher: 'You have',
  freeVoucher: 'free vouchers',
  of: 'of',
  vouchers: 'vouchers',

  /// TABS
  accessTo: 'Access to',
  allStores: 'All stores',
  products: 'Products',
  productNew: 'New product',
  productShow: 'Show product',
  providers: 'Providers',
  providerNew: 'New provider',
  providerShow: 'Show provider',
  clients: 'Clients',
  clientNew: 'New client',
  clientShow: 'Show client',
  printers: 'Printers',
  printerNew: 'New printer',
  printerShow: 'Show printer',
  reports: 'Reports',
  sales: 'Sales',
  saleVoucher: 'Vouchers',
  saleVoucherNew: 'New voucher',
  saleVoucherDet: 'Voucher detail',
  cashFlow: 'Cash flow',
  cashOpening: 'Openings',
  cashIncomes: 'Income',
  cashWithdrawal: 'Withdrawal',
  cashDeskClosings: 'Cash desk closings',
  /// FOOTER
  madeWith: 'Made with',
  by: 'by',

  /// USERS
  userPhoto: 'User Photo',
  userLogin: 'Login',
  userEmail: 'Email',
  userPassword: 'Password',
  userPersonalData: 'Personal information',
  userDocumentNum: 'Document number',
  userNames: 'Names',
  userLastNames: 'Lastnames',
  userPhone: 'Phone',
  userBirthDay: 'Date of birth',
  userRols: 'Role(s)',
  userSoterCash: 'Store/Cash',
  userRoleOf: 'Role of',
  userRolsChoose: 'Choose the products you want to add.',
  userRolRead: 'Read',
  userRolCreate: 'Create',
  userRolEdit: 'Edit',
  userRolDelete: 'Delete',

  /// VALIDATION
  valReq: 'This field is required',
  valMinLeng: 'This field must have a minimum of',
  valLength: 'This field must have',
  characters: 'characters',
  alfaNum: 'This field must contain only alphanumeric characters',
  valNum: 'This field must contain only numeric characters',
  valRealPos: 'This field must contain a positive real number',
  valEmail: 'This field must be a valid email',
  valIP: 'This field must be a valid IP',
  valMAC: 'This field must be a valid MAC address',
  valPhone: 'Invalid phone number',

  /// PRODUCTS
  prodNewPath: 'Products/List of products/New product',
  prodEditPath: 'Products/List of products/Edit product',
  prodNewSubBtn: 'Create Product',
  prodEditSubBtn: 'Update Product',
  prodFieldName: 'Product name',
  prodFieldTypeProd: 'Type of product',
  prodFieldTypeOperation: 'Type of operation',
  prodFieldCheckPurch: 'Purchase',
  prodFieldCheckSell: 'Sale',
  prodFieldCheckInvent: 'Inventory',
  prodFieldIntCode: 'Internal code',
  prodFieldBarCode: 'Barcode',
  prodFieldWeight: 'Weight(KG)',
  prodFieldMeasure: 'Unidad de Medida',
  prodFieldPurch: 'Purchase price',
  prodFieldSell: 'Sale price',
  prodFieldDesc: 'Enter a message',
  prodFieldActive: 'Activate in...',
  prodFieldAll: 'All',
  prodFieldSunat: 'I know SUNAT code (Optional)',
  prodFieldProd: 'Product',
  prodFieldClass: 'Class',
  prodFieldSeg: 'Segment',
  prodFieldFam: 'Family',
  /// LIST
  prodListCinter: 'Internal C.',
  prodListCBar: 'Barcode',
  prodListName: 'Name',
  prodListPcost: 'Price Cost',
  prodListPunit: 'Unit Price',
  prodListOpt: 'Options',
  prodListBtn: 'New product',
  prodListPath: 'Products/List of products',
  prodListFilter: 'Search products',
  prodFilterBy: 'Filter by...',
  prodFilterStore: 'Store:',
  prodFilterTime: 'Time:',
  prodFilterVocher: 'T. Vouchers:',
  prodFilterState: 'State:',
  prodFilterAmount: 'Amount:',
  prodFilterClear: 'Clean',
  prodFilterSearch: 'Search',

  ///   CLIENTS
  clientNewPath: 'Clients/List of clients/New client',
  clientEditPath: 'Clients/List of clients/Edit client',
  clientNewSubBtn: 'Create Client',
  clientEditSubBtn: 'Update Client',
  clientFieldTypeCon: 'Type of contact',
  clientFieldCheckClient: 'Customer',
  clientFieldChecksuppl: 'Supplier',
  clientFieldNumDoc: 'Document number',
  clientFieldClientCode: 'Client code',
  clientFieldClientName: 'Client name',
  clientFieldClientTrade: 'Tradename',
  clientFieldClientBusiName: 'Business name',
  clientFieldClientLast: 'Client last name',
  clientFieldClientNumCon: 'Contact number',
  clientFieldEmail: 'Email',
  clientFieldDate: 'Date of birth',
  clientFieldContPer: 'Contact person',
  clientFieldNote: 'Note',
  clientFieldAdFis: 'Fiscal address',
  clientFieldDept: 'Department',
  clientFieldProv: 'Province',
  clientFieldDist: 'District',
  clientFieldAdd: 'Address',
  clientFieldAltDir: 'Alternate directions',
  clientFieldBraName: 'Branch name',
  /// LIST
  clientListCode: 'Client C.',
  clientListDoc: 'Doc',
  clientListName: 'Name/B. Reason',
  clientListLast: 'Lastname/B. Name',
  clientListContact: 'Type of C.',
  clientListPhone: 'Phone',
  clientListOpt: 'Options',
  clientListBtn: 'New client',
  clientListPath: 'Clients/List of clients',
  clientListFilter: 'Search clients',
  /// MODAL FILTER
  clientModalFilterBy: 'Filter by...',
  clientModalTypeClient: 'Client T.:',
  clientModalDept: 'Department:',
  clientModalProv: 'Province:',
  clientModalDist: 'District:',
  clientModalClear: 'Clean',
  clientModalSearch: 'Search',
  /// POPOVERVIEW
  clientTaxAddTitle: 'Task residence',
  clientTaxAddBody:
    'The tax domicile is the location of the taxpayer in his relations with the Tax Administration. For individuals, the tax domicile will be the place where they have their habitual residence.',
  clientAlterDirTitle: 'Alternate addresses',
  clientAlterDirBody:
    'Alternate company address, frequently used when making referral guides for product dispatch.',

  /// ENTERPRISES
  enterpriseFormData: 'General data',
  enterpriseFormNumDoc: 'Document number',
  enterpriseFormBusiRea: 'Business name',
  enterpriseFormBusiName: 'Tradename',
  enterpriseFormAddress: 'Address',
  enterpriseFormCountry: 'Country',
  enterpriseFormDepto: 'Department',
  enterpriseFormProv: 'Province',
  enterpriseFormDist: 'District',
  enterpriseFormEco: 'Economic activity',
  enterpriseFormContPhone: '(Contact number)',
  enterpriseFormCurrency: 'Currency',
  enterpriseFormDecGen: 'General decimals (2-4)',

  /// USER OPTIONS
  userOptAdminProf: 'Manage profile',
  userOptMyAcc: 'My account',
  userOptEnterprise: 'Business',
  userOptConfig: 'Setting',
  userOptVideo: 'Tutorial videos',
  userOptTerms: 'Terms and Conditions',
  userOptPolite: 'Privacy Policy',
  userOptLogout: 'Sign off',

  /// PROVIDERS
  providerNewPath: 'Providers/List of providers/New provider',
  providerEditPath: 'Providers/List of providers/Editar provider',
  providerNewSubBtn: 'Create Provider',
  providerEditSubBtn: 'Update Provider',
  providerFieldProviderCode: 'Provider code',
  providerFieldProviderName: 'Provider name',
  providerFieldProviderLast: 'Provider last name',
  /// LIST
  providerListCode: 'C. Proveedor',
  providerListDoc: 'Doc',
  providerListName: 'Name/B. Reason',
  providerListLast: 'Lastname/B. Name',
  providerListContact: 'Type of C.',
  providerListPhone: 'Phone',
  providerListOpt: 'Options',
  providerListBtn: 'New provider',
  providerListPath: 'Providers/List of providers',
  providerListFilter: 'Search providers',

  /// DEVICES
  printerNewPath: 'Printers/List of printers/New printer',
  printerEditPath: 'Printers/List of printers/Edit printer',
  printerNewSubBtn: 'Create Printer',
  printerEditSubBtn: 'Update Printer',
  printerFieldName: 'Printer name',
  printerFieldTypeCon: 'Connection type',
  printerFieldIpNum: 'IP number',
  printerFieldMACNum: 'MAC number',
  printerFieldPortNum: 'Port number',
  printerFieldTypePap: 'Kind of paper',
  printerFieldCategory: 'Category',
  printerFieldShowOpt: 'Show print or reprint option',
  printerFieldAutoPrint: 'Auto print tickets',
  printerBtnClear: 'Clean fields',
  printerBtnTry: 'Test print',
  /// LIST
  printerListName: 'Printer N.',
  printerListType: 'Printer T.',
  printerListBarCode: 'Bar Code',
  printerListDesc: 'Description',
  printerListPaper: 'Type D.',
  printerListPair: 'Connection T.',
  printerListEquip: 'Equip. Info.',
  printerListStore: 'Store',
  printerListActions: 'Actions',
  printerListBtn: 'New printer',
  printerListPath: 'Printers/List of printers',
  printerListFilter: 'Search by client / Ruc / Client Code / Correlative ...',

  /// VOUCHERS
  voucherNewPath: 'Sales/Vouchers/New voucher',
  voucherDropGenerate: 'Generate in:',
  voucherNewSubBtn: 'New Voucher',
  /// LIST
  vouListNdoc: 'Doc N',
  vouListClient: 'Client',
  vouListAmount: 'Amount',
  vouListDate: 'Date/Hour',
  vouListState: 'State',
  vouListSunat: 'SUNAT',
  vouListDocVinc: 'Linked Doc',
  vouListAcc: 'Actions',
  vouListBtn: 'New voucher',
  vouListPath: 'Sales/Vouchers',
  vouListFilter: 'Search voucher',
  /// FORM
  vouFormNotFound: 'The product was not found',
  vouFormCreate: 'Create product',
  vouFormAdd: 'Add',
  vouFormNameCode: 'Name/Code',
  vouFormPrice: 'Price',
  vouFormProd: 'Product by barcode',
  vouFormShot: 'Spray product',
  vouFormProduct: 'Product',
  vouFormSearchProduct: 'Search product',
  vouFormAlert: 'Alert!',
  vouFormCleanCartQ: 'Clear cart?',
  vouFormCleanCart: 'Clear cart',
  vouFormClient: 'Client',
  vouFormSearchClient: 'Search client',
  vouFormGenericClient: 'Generic client',
  vouFormCollect: 'Collect',
  vouFormDescGen: 'Blanket discount',
  vouFormNameDoc: 'Name/Document',

  // CASH FLOW
  // OPENINGS
  cashFlowOpeningListPath: 'Cash flow/Cash openings',
  cashFlowNewOpening: 'New opening',
  closing: 'Closing',
  // INCOME
  cashFlowIncomesListPath: 'Cash flow/Incomes',
  cashFlowNewIncome: 'New income',
  // WITHDRAWALS
  cashFlowWithdrawalsListPath: 'Cash flow/Withdrawals',
  cashFlowNewWithdrawal: 'New withdrawals',
  // CASH DESK CLOSINGS
  cashFlowCashDeskClosingsListPath: 'Cash flow/Cash desk closings',
  cashFlowNewCashDeskClosing: 'New cash desk closing'
}

export default en
