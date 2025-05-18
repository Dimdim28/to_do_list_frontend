export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  NEEDS_EMAIL_VERIFICATION = 'needs-email-verification',
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum Language {
  EN = 'en',
  RU = 'ru',
  UA = 'ua',
}

export enum TranslationKeys {
  Profile = 'profile',
  Home = 'home',
  Footer = 'footer',
  ServerError = 'serverError',
  Categories = 'categories',
  NoCategories = 'noCategories',
  AddCategory = 'addCategory',
  AddTask = 'addTask',
  DateAndStatus = 'dateAndStatus',
  Deadline = 'deadline',
  DeadlineFilters = 'deadlineFilters',
  CompletionStatus = 'completionStatus',
  SharedWith = 'sharedWith',
  LinksAttached = 'linksAttached',
  Name = 'name',
  Email = 'email',
  Registered = 'registered',
  LogOut = 'logOut',
  ChangePassword = 'changePassword',
  DeleteAccount = 'deleteAccount',
  ShowMyId = 'showMyId',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  All = 'all',
  Outdated = 'outdated',
  NoDeadline = 'noDeadline',
  Completed = 'completed',
  InProcess = 'inProcess',
  CategoryColor = 'categoryColor',
  Title = 'title',
  Cancel = 'cancel',
  Submit = 'submit',
  ReallyCategory = 'reallyСategory',
  Description = 'description',
  TaskHasDeadline = 'taskHasDeadline',
  TaskCompleted = 'taskCompleted',
  ReallyTask = 'reallyTask',
  ReallySubTask = 'reallySubTask',
  ReallyRejectSubTask = 'reallyRejectSubTask',
  AddingLink = 'additingLink',
  Link = 'link',
  EnterID = 'enterID',
  UserID = 'userID',
  AreYouSure = 'areYouSure',
  Yes = 'yes',
  No = 'no',
  Password = 'password',
  NewPassword = 'newPassword',
  Required = 'required',
  LoginBold = 'loginBold',
  SignIn = 'signIn',
  SignUp = 'signUp',
  Login = 'login',
  SignUpBold = 'signUpBold',
  EnterPassword = 'enterPassword',
  ConfirmPassword = 'confirmPassword',
  StatsLabel = 'statsLabel',
  DeadlineDay = 'deadlineDay',
  DeadlineWeek = 'deadlineWeek',
  DeadlineMonth = 'deadlineMonth',
  DeadlineYear = 'deadlineYear',
  DeadlineAll = 'deadlineAll',
  DeadlineOutdated = 'deadlineOutdated',
  DeadlineNoDeadline = 'deadlineNoDeadline',
  StatusCompleted = 'statusCompleted',
  StatusInProcess = 'statusInProcess',
  StatusAll = 'statusAll',
  FAQ = 'faq',
  Back = 'back',
  FAQBold = 'faqBold',
  Question1 = 'question1',
  Question2 = 'question2',
  Question3 = 'question3',
  Question4 = 'question4',
  Question5 = 'question5',
  Question6 = 'question6',
  Question7 = 'question7',
  Question8 = 'question8',
  Question9 = 'question9',
  Question10 = 'question10',
  Answer1 = 'answer1',
  Answer2 = 'answer2',
  Answer3 = 'answer3',
  Answer4 = 'answer4',
  Answer5 = 'answer5',
  Answer6 = 'answer6',
  Answer7 = 'answer7',
  Answer8 = 'answer8',
  Answer9 = 'answer9',
  Answer10 = 'answer10',
}

export type Avatar = {
  url: string;
  public_id: string;
};

export type User = {
  _id: string;
  username: string;
  avatar: string;
  avatarEffect?: AvatarEffect;
};

export type ProfileEffect = {
  title: string;
  intro?: string;
  preview: string;
  sides: string;
  top?: string;
  _id: string;
};

export type AvatarEffect = {
  _id: string;
  title: string;
  preview: string;
  animated: string;
};
