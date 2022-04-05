import { all, call } from 'redux-saga/effects'
import domain from './domain'
import domainForAdmin from './domainForAdmin'
import user from './user'
import transaction from './transaction'
import token from './token'
import info from './info'
// import accounts from '../views/Admin/Accounts/sagas'
// import metaTags from '../views/Admin/MetaTags/saga'
// import watchCart from '../views/Cart/sagas/watchers'
// import watcherSearch from '../views/Search/saga'
// import watchProfile from '../views/viewprofile/sagas/watchers'
// import watchAffiliates from '../views/Affiliates/sagas/watchers'
// import watchSendEmails from '../views/SendEmail/sagas/watchers'
// import watchSendEmailsAdmin from '../views/Admin/settingEmail/sagas/watchers'
// import portfolio from '../views/Portfolio/sagas'
// import dashboard from '../views/Admin/Dashboard/sagas'

export default function* rootSaga() {
  yield all([
    call(domain),
    call(user),
    call(transaction),
    call(domainForAdmin),
    call(token),
    call(info),
    // call(accounts),
    // call(metaTags),
    // call(watchCart),
    // call(watcherSearch),
    // call(watchProfile),
    // call(watchAffiliates),
    // call(watchSendEmails),
    // call(watchSendEmailsAdmin),
    // call(portfolio),
    // call(dashboard),
  ])
}
