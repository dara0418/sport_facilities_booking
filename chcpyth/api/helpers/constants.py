""" This file contains cross app constants.
"""

# Frequencies.
DAILY = 'DY'
MONTHLY = 'MY'
QUARTERLY = 'QY'
YEARLY = 'YY'

FREQUENCY_CHOICES = (
    (DAILY, 'Daily'),
    (MONTHLY, 'Monthly'),
    (QUARTERLY, 'QY'),
    (YEARLY, 'YY')
)

# Time units.
MINUTE = 'M'
HOUR = 'H'
DAY = 'D'
MONTH = 'N'
YEAR = 'Y'

TIME_UNIT_CHOICES = (
    (MINUTE, 'Minute'),
    (HOUR, 'Hour'),
    (DAY, 'Day'),
    (MONTH, 'Month'),
    (YEAR, 'Year')
)

# Level choices.
BRONZE = 'bronze'
SILVER = 'silver'
GOLD = 'gold'
PLATINUM = 'platinum'

LEVEL_CHOICES = (
    (BRONZE, 'Bronze'),
    (SILVER, 'Silver'),
    (GOLD, 'Gold'),
    (PLATINUM, 'Platinum')
)

# General status.
ACTIVE = 'active'
INACTIVE = 'inactive'

STATUS_CHOICES = (
    (ACTIVE, 'Active'),
    (INACTIVE, 'Inactive')
)

# Sport types.
TENNIS = 'T'
PING_PONG = 'G'
PADDLE = 'D'
BADMINTON = 'B'
SQUASH = 'S'
FOOTBALL_5 = 'F5'

SPORT_CHOICES = (
    (TENNIS, 'Tennis'),
    (PING_PONG, 'Ping pong'),
    (PADDLE, 'Paddle'),
    (BADMINTON, 'Badminton'),
    (SQUASH, 'Squash'),
    (FOOTBALL_5, 'Football-5')
)

# Privacy levels.
PUBLIC = 'U'
PRIVATE = 'P'
RESTRICTED = 'R'

PRIVACY_CHOIES = (
    (PUBLIC, 'Public'),
    (PRIVATE, 'Private'),
    (RESTRICTED, 'Restricted')
)

# Payment status.
PAYMENT_PENDING = 'P'
PAYMENT_SUBMITTED = 'S'
PAYMENT_CONFIRMED = 'C'
PAYMENT_CANCELED = 'A'

PAYMENT_STATUS_CHOICES = (
    (PAYMENT_PENDING, 'Pending'),
    (PAYMENT_SUBMITTED, 'Submitted'),
    (PAYMENT_CONFIRMED, 'Confirmed'),
    (PAYMENT_CANCELED, 'Canceled')
)

# Titles.
MR = 'MR'
MS = 'MS'
MRS = 'MRS'

TITLE_CHOICES = (
    (MR, 'Mr.'),
    (MS, 'Ms.'),
    (MRS, 'Mrs.')
)

# Genders.
MALE = 'M'
FEMALE = 'F'

GENDER_CHOICES = (
    (MALE, 'Male'),
    (FEMALE, 'Female')
)

# Club roles.
GENERAL_MEMBER = 'M'
PROFESSOR = 'P'
CLUB_ADMIN = 'A'

CLUB_ROLE_CHOICES = (
    (GENERAL_MEMBER, 'General member'),
    (PROFESSOR, 'Professor'),
    (CLUB_ADMIN, 'Club administrator')
)

# Types of membership requests.
MEMBER_REQUEST = 'MR'
CLUB_INVITATION = 'CI'

MEMBERSHIP_REQUEST_TYPE_CHOICES = (
    (MEMBER_REQUEST, 'Member request'),
    (CLUB_INVITATION, 'Club invitation')
)

# Status of membership requests.
MEMBERSHIP_PENDING = 'P'
MEMBERSHIP_APPROVED = 'A'
MEMBERSHIP_IGNORED = 'I'
MEMBERSHIP_REJECTED = 'R'

MEMBERSHIP_REQUEST_STATUS_CHOICES = (
    (MEMBERSHIP_PENDING, 'Pending'),
    (MEMBERSHIP_APPROVED, 'Approved'),
    (MEMBERSHIP_IGNORED, 'Ignored'),
    (MEMBERSHIP_REJECTED, 'Rejected')
)