const Language = {
    en: {
    comp:{
        setup:{
            titleembed:"Comp Settings",
            descembed:"Here is you can edit Comp's Settings",
            channelJoiners:"Voter's Channel",
            channelMosabka:"Comp's Channel",
            title:"Comp's Title",
            desc:"Comp's Description",
            react:"Comp's React",
            image:"Comp's Image URL",
            thumbnail:"Comp's Thumbnail",
            channelplaceholder:"Choose Comp's Channel",
            channelvplaceholder:"Choose Voter's Channel"
        },
        panel:{
            placeholder:"Admin Controller",
            status:"Status",
            errorchannels:"Channels was not set",
            title:"Competition",
            description:"Welcome to Competition , Let's Join it and win !"
            ,joinbtn:"Join",
            leftbtn:"Leave",
            compalready:"Competition is already running now !"
        }
    },
    card:{
        donetransfer:"Done Transfered Successfully",
        cardnumbererror:"Card Number is inCorrect",
        coinserror:"You don't have enough coins",
        cvverror:"Your Cvv incorrect",
        userdoesnthave:"User doesn't has a card",
        balance:"Your balance is : [amount] [emoji]",
        errorhavecard:"You have already card",
        erronohavecard:"You Dont have card to do this",
        donecard:"Done Created Your Card"
    },
        components: {
            createAccount: {
                verified:"Your Account already verified",
                codeerr:"Code what you entered incorrect",
                code: "Write the verification code",
                errtime: "Time is end please remake account",
                labelverify: "Verify your email",
                senddone: "Done sent to your email",
                lastNameText: "Type Your Last Name",
                firstNameText: "Type Your First Name",
                modaltitle: "Create Account",
                textGmail: "Enter Your Email",
                emailVaild: "Email should have @example.com"
            }
        },
        ping: {
            message: "**[ping] MS**"
        },
        cooldown: {
            message: "**You should wait <duration> to use this command**"
        },

        "help": {
            "placeholderques": "You can find your question here",
            "bank": "Bank",
            "title": "Help List",
            "description": "**Let's explore the bot commands together!**"
        },

        "questions": {
            "help": [
                { "label": "How to make an account?", "value": "q0", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "What is the idea of the bot?", "value": "q1", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "How can I increase my currency?", "value": "q2", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "How not to lose the credits I have?", "value": "q3", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Where are the servers dealing with Tera?", "value": "q4", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Why should I convert my credits to Tera?", "value": "q5", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Is the bot only a currency?", "value": "q6", "emoji": "<:Frame56:1240761318886346833>" }
            ]
        },
        "answers": {
            "help": [
                { "label": "Go to our server or a server that contains the control panel", "value": "q0" },
                { "label": "Our bot is a bot with a currency and a giveaway bot known as Giveaway Bot. Our bot is distinguished by its development.\nIn short, you can convert your credits to our currency or collect and trade with others in a protected environment from scammers.\nIf you are scammed, your rights will be returned and deducted from the scammer.\nIf you want to return the credits you have, they will be returned but with a 5% deduction.", "value": "q1" },
                { "label": "You receive the daily and you can also trade with confidence that your rights are not lost. We will soon provide a strong system.", "value": "q2" },
                { "label": "You convert your credits to Tera and deal with traders. If someone scams you, we will return your rights.", "value": "q3" },
                { "label": "You enter our server and find a room with people supporting the currency and dealing with it.", "value": "q4" },
                { "label": "You go to our server, the 'buy' room, open a ticket, and convert your credits to Tera.", "value": "q5" },
                { "label": "No, our bot also has a giveaway feature.", "value": "q6" }
            ]
        },






        owner: {
            message: "**This Command For Bot CREW Only**"
        },
        jail: {
            jailtitle: "Scammers",
            usertlabel: "The person who was scammed",
            amountscummer: "The amount which was scammed",
            scammeridlabel: "Type Scammer Id",
        },
        language: {
            placeholder: "Please Choose the language",
            done: "**Language was set successfully**"
        },
        panel: {
            nopanel: "**Sorry, your server is not one of our servers **"
        },
        scammer: {
            reason:"What is the reason",
            doneSearch: "Searched Successfully",
            doneAdded: "**Done Added Scammer Successfully**",
            doneDeleted: "**The scammer has been successfully unbanned. **",
            labeladd: "Report on Scammer",
            findScummer: "Find Scammer",
            deleteScummer: "Unban Scammer",
            title: "Scammers Panel",
            ownershippremiusson: "You Should be ownership for server", //
            desc: "**We protect our currency from any scam attempts. When reported, we thoroughly examine the evidence and restore justice to its owner, while blacklisting the scammer.**"
        },

        "giveaway": {
            "lengtherror": "Maximum number of giveaways is 15",
            "timeerror": "**Time format error, it should include s,m,h,d and maximum duration is 14 days**",
            "counterror": "**Number of giveaways should be 5 or less**",
            "donemaked": "**Giveaway(s) successfully created**",
            "rerollmsg": "**[emoji] Giveaway rerolled successfully**",
            "unpausemsg": "**[emoji] Giveaway unpause successful**",
            "pausemsg": "**[emoji] Giveaway paused successfully**",
            "deletemg": "**[emoji] Giveaway deleted successfully**",
            "endmsg": "**[emoji] Giveaway ended successfully**",
            "error": "**[emoji] An error occurred**",
            "giveawaycontent": "[emoji] **New Giveaway** [emoji]",
            "giveawayEnded": "[emoji] **New Giveaway** [emoji]",
            "drawing": "Time remaining: {timestamp}",
            "dropMessage": "Be the first to participate [emoji] !",
            "inviteToParticipate": "Participate by clicking [emoji] below",
            "winMessage": "**Congratulations to the winner(s)** ( {winners} ) You won **{this.prize}** [emoji]",
            "winners": "Winner(s)",
            "endedAt": "Ends at",
            "hostedBy": "Hosted by: {this.hostedBy}",
            "noWinner": "**Giveaway canceled due to lack of participants**"
        },
        "errorr": {
            "deleteno": "I can't find what you want to delete",
            "passworderror": "Password you entered is not correct or new password doesn't match confirm password"
        },
        "privatemode": {
            "enabled": "**Private account mode enabled**",
            "disabled": "**Private account mode disabled**"
        },


        permissionme: "**I Don't have `<permission>` for use this command.** ",
        permission: "**You Don't have `<permission>` for use this command. **",



        private: {
            "premiumBuy": "[emoji] Subscription purchased successfully\nPremium User: **[buyer]**\nDays: **[days]**\nCode: **[code]**\nTime: **[time]**\nReason\n||`[reason]`||\n**Thx for using our services and purchasing our premium commands, we hope you're happy with our services [emoji2]**",
            "passworddoneset": "Password set successfully",
            "lastpasswordtext": "Enter your last password",
            "newpassword": "Enter the password you want",
            "cofirmpassword": "Confirm the password",
            "modaltitlepasswordedit": "Set Password",
            "donetransfersend": "**[emoji] <@[userr]>,** Received **[amount] Of Terra(s)** from <@[usert]>",
            "donetransfer": "Transfer completed successfully",
            "transfer": "[emoji] New bank transfer\nReceiver: **[receiver]**\nGiver: **[giver]**\nAmount: **[amount]**\nTime: **[time]**\nReason\n||`[reason]`||\n**Thx for using our services, we hope you're happy with our services [emoji2]**",
            "transferterrauser": "Receiver's ID",
            "transferterraamount": "Amount",
            "transferterrareason": "Transfer Reason",
            "donereport": "Reported",
            "donedelete": "Successfully deleted",
            "errordaily": "An error occurred",
            "dailytaken": "Daily taken",
            "wait": "You should wait [time]",
            "createdacc": "Account created",
            "errorhaveacc": "You already have an account",
            "titleuser": "Account Information",
            "userid": "User ID",
            "username": "Username",
            "coins": "Balance",
            "createdAt": "Account created at",
            "thx": "Thank you for using our service",
            "donesecured": "Secured balance visibility activated",
            "blacklisted": "Blacklisted",
            "yes": "Yes",
            "no": "No",
            "unknown": "Unknown",
            "premium": "Premium",
            "scammerd": "Scammer",
            "blacklistedmsg": "You have been blacklisted for misconduct",
            "scummermsg": "You have been listed as a scammer for misconduct",
            "displayname": "Display Name"
        },
        captcha: {
            
            transferterramodal: "Transfer Terra",
            "usershouldhaveacc": "The person you're transferring to must have an account.",
            "errorcoinsenough": "You don't have enough Terra for this.",
            "passwordtitle": "Verify Password",
            "nopassword": "You must specify the password.",
            "waiting": "Waiting for <thing>",
            "errorcaptchashape": "You chose the wrong captcha shape.",
            "shapetype": "Please select the correct shape. Shape name: [shape]",
            "passwordtype": "Please click on the button below and enter your wallet password.",
            "passwordmodal": "Enter your password",
            "passwordbtn": "Password Field",
            "errorpassword": "The password you are trying to enter is incorrect.",
            "errornoacc": "Create an account to register your information and create your own wallet."
        },
        premium: {
            "errorhavepremium": "You have premium.",
            "titlebuy": "Let's Buy Premium",
            "month": "Month",
            "year": "Year",
            "modalreporttitle": "Bot Issue",
            "labelreport": "Explain the issue",
            "donetransferacc": "Account transferred successfully",
            "haveacctransfer": "The person must not have an account to transfer to.",
            "modaltransfertitle": "Transfer Data",
            "labeltransfer": "Enter the User's ID",
            "nopre": "You don't have a premium subscription to do that.",
            "createbtn": "Open Account",
            "deletebtn": "Close Account",
            "dailybtn": "Daily Salary",
            "transferbtn": "Transfer My Data",
            "reportbtn": "Report",
            "descpanel": "You can open and close your account, and receive the daily salary in a secure manner. If you have a monthly premium subscription, you can transfer your information to another account.",
            "titlepanel": "Control",
            "createdAt": "Subscribed At",
            "endsAt": "Ends At",
            "days": "Remaining Time",
            "titleinfo": "Subscription Information"

        },
        "done": "**Success [emoji]**",
        "error": "**An error occurred. Please try again later.**",
        "setupdone": "**Operation completed successfully**",
        "donedeleted": "**Successfully deleted [emoji]**"
    },
    ar: {
        card: {
            donetransfer: "تم التحويل بنجاح",
            cardnumbererror: "رقم البطاقة غير صحيح",
            coinserror: "ليس لديك ما يكفي من العملات",
            cvverror: "رمز التحقق (CVV) غير صحيح",
            userdoesnthave: "المستخدم ليس لديه بطاقة",
            balance: "رصيدك هو: [amount] [emoji]",
            errorhavecard: "لديك بطاقة بالفعل",
            erronohavecard: "ليس لديك بطاقة للقيام بذلك",
            donecard: "تم إنشاء بطاقتك"
        },
      
            components: {
                createAccount: {
                    verified: "تم التحقق من حسابك بالفعل",
                    codeerr: "الرمز الذي أدخلته غير صحيح",
                    code: "اكتب رمز التحقق",
                    errtime: "انتهى الوقت، يرجى إعادة إنشاء الحساب",
                    labelverify: "تحقق من بريدك الإلكتروني",
                    senddone: "تم إرسالها إلى بريدك الإلكتروني",
                    lastNameText: "اكتب اسمك الأخير",
                    firstNameText: "اكتب اسمك الأول",
                    modaltitle: "إنشاء حساب",
                    textGmail: "أدخل بريدك الإلكتروني",
                    emailVaild: "يجب أن يحتوي البريد الإلكتروني على @example.com"
                }
            
        },
        



        "questions": {
            "help": [
                { "label": "كيف يمكنني إنشاء حساب؟", "value": "q0", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "ما هي فكرة البوت؟", "value": "q1", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "كيف يمكنني زيادة العملة الخاصة بي؟", "value": "q2", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "كيف لا أفقد الرصيد الذي لدي؟", "value": "q3", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "أين توجد الخوادم التي تتعامل مع تيرا؟", "value": "q4", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "لماذا يجب أن أحول رصيدي إلى تيرا؟", "value": "q5", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "هل البوت مجرد عملة؟", "value": "q6", "emoji": "<:Frame56:1240761318886346833>" }
            ]
        },
        "answers": {
            "help": [
                { "label": "الذهاب إلى خادمنا أو خادم يحتوي على لوحة التحكم", "value": "q0" },
                { "label": "البوت الخاص بنا هو بوت لديه عملة وبوت مسابقات المعروف بجيف اواي. بوتنا متميز بتطويره.\nباختصار، يمكنك تحويل الرصيد الخاص بك إلى عملتنا أو جمعه والتجارة مع الآخرين في بيئة محمية من النصابين.\nإذا تم النصب عليك، سيتم إعادة حقك وخصمه من النصاب.\nوإذا أردت إعادة الرصيد الذي لديك، سيتم إعادته مع خصم 5%.", "value": "q1" },
                { "label": "تحصل على الدخل اليومي ويمكنك أيضًا التجارة بثقة أن حقوقك ليست ضائعة. سنوفر قريبًا نظامًا قويًا.", "value": "q2" },
                { "label": "تحول رصيدك إلى تيرا وتتعامل مع التجار. إذا نصب عليك أحد، سنعيد لك حقوقك.", "value": "q3" },
                { "label": "تدخل خادمنا وتجد غرفة فيها الناس الذين يدعمون العملة ويتعاملون بها.", "value": "q4" },
                { "label": "تذهب إلى خادمنا وغرفة الشراء وتفتح تذكرة وتحول رصيدك إلى تيرا.", "value": "q5" },
                { "label": "لا، البوت الخاص بنا يحتوي أيضًا على ميزة المسابقات.", "value": "q6" }
            ]
        },


        "help": {
            "placeholderques": "يمكنك العثور على سؤالك هنا",
            "bank": "البنك",
            "title": "قائمة المساعدة",
            "description": "**لنستكشف أوامر البوت معًا!**"
        },


        "ping": {
            "message": "**[ping] MS**"
        },
        "cooldown": {
            "message": "**يجب عليك الانتظار <duration> لاستخدام هذا الأمر**"
        },
        "owner": {
            "message": "**هذا الأمر لطاقم البوت فقط**"
        },
        "jail": {
            "jailtitle": "النصابين",
            "usertlabel": "الشخص الذي تم النصب عليه",
            "amountscummer": "المبلغ الذي تم النصب به",
            "scammeridlabel": "أدخل مًعرف النصاب"
        },
        "language": {
            "placeholder": "يرجى اختيار اللغة",
            "done": "**تم تعيين اللغة بنجاح**"
        },
        "panel": {
            "nopanel": "**عذرًا، خادمك ليس واحدًا من خوادمنا**"
        },
        scammer: {
            reason: "ما هو السبب",
            doneSearch: "تم البحث بنجاح",
            doneAdded: "**تمت إضافة المحتال بنجاح**",
            doneDeleted: "**تم إلغاء حظر المحتال بنجاح**",
            labeladd: "الإبلاغ عن محتال",
            findScummer: "البحث عن محتال",
            deleteScummer: "إلغاء حظر محتال",
            title: "لوحة المحتالين",
            ownershippremiusson: "يجب أن تكون مالك السيرفر",
            desc: "**نحن نحمي عملتنا من أي محاولات احتيال. عند الإبلاغ، نفحص الأدلة بدقة ونعيد العدالة إلى صاحبها، بينما نضيف المحتال إلى القائمة السوداء.**"
        },
        "giveaway": {
            "lengtherror": "الحد الأقصى لعدد الهدايا هو 15",
            "timeerror": "**خطأ في تنسيق الوقت، يجب أن يتضمن s، m، h، d والمدة القصوى هي 14 يومًا**",
            "counterror": "**عدد الهدايا يجب أن يكون 5 أو أقل**",
            "donemaked": "**تم إنشاء الهدية (الهدايا) بنجاح**",
            "rerollmsg": "**تم إعادة السحب على الهدية بنجاح**",
            "unpausemsg": "**تم إلغاء توقف الهدية بنجاح**",
            "pausemsg": "**تم إيقاف الهدية بنجاح**",
            "deletemg": "**تم حذف الهدية بنجاح**",
            "endmsg": "**انتهت الهدية بنجاح**",
            "error": "**حدث خطأ**",
            "giveawaycontent": "[emoji] **هدية جديدة** [emoji]",
            "giveawayEnded": "[emoji] **هدية جديدة** [emoji]",
            "drawing": "الوقت المتبقي: {timestamp}",
            "dropMessage": "كن أول من يشارك [emoji] !",
            "inviteToParticipate": "شارك بالنقر فوق [emoji] أدناه",
            "winMessage": "**تهانينا للفائز(ين)** ( {winners} ) لقد فزت بـ **{this.prize}** [emoji]",
            "winners": "الفائزون",
            "endedAt": "ينتهي في",
            "hostedBy": "مقدمة من: {this.hostedBy}",
            "noWinner": "**تم إلغاء الهدية بسبب عدم وجود مشاركين**"
        },
        "errorr": {
            "deleteno": "لا أستطيع العثور على ما تريده لحذفه",
            "passworderror": "كلمة المرور التي أدخلتها غير صحيحة أو لا تتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور"
        },
        "privatemode": {
            "enabled": "**تم تمكين الوضع الخاص بالحساب**",
            "disabled": "**تم تعطيل الوضع الخاص بالحساب**"
        },
        "permissionme": "**ليس لدي `<permission>` لاستخدام هذا الأمر.**",
        "permission": "**ليس لديك `<permission>` لاستخدام هذا الأمر.**",
        "private": {
            "premiumBuy": "[emoji] تم شراء الاشتراك بنجاح\nمستخدم بريميوم: **[buyer]**\nأيام: **[days]**\nكود: **[code]**\nالوقت: **[time]**\nالسبب\n||`[reason]`||\n**شكرًا لاستخدام خدماتنا وشراء أوامرنا البريميوم، نأمل أن تكون راضيًا عن خدماتنا [emoji2]**",
            "passworddoneset": "تم ضبط كلمة المرور بنجاح",
            "lastpasswordtext": "أدخل كلمة المرور السابقة الخاصة بك",
            "newpassword": "أدخل كلمة المرور الجديدة التي تريدها",
            "cofirmpassword": "تأكيد كلمة المرور",
            "modaltitlepasswordedit": "ضبط كلمة المرور",
            "donetransfersend": "**[emoji] <@[userr]>,** استلم **[amount] من التيرا(s)** من <@[usert]>",
            "donetransfer": "تم نقل الأموال بنجاح",
            "transfer": "[emoji] تحويل بنكي جديد\nالمستلم: **[receiver]**\nالمانح: **[giver]**\nالمبلغ: **[amount]**\nالوقت: **[time]**\nالسبب\n||`[reason]`||\n**شكرًا لاستخدام خدماتنا، نأمل أن تكون راضيًا عن خدماتنا [emoji2]**",
            "transferterrauser": "مًعرف المستلم",
            "transferterraamount": "المبلغ",
            "transferterrareason": "سبب التحويل",
            "donereport": "تم الإبلاغ",
            "donedelete": "تم الحذف بنجاح",
            "errordaily": "حدث خطأ",
            "dailytaken": "تم أخذ اليومية",
            "wait": "يجب عليك الانتظار [time]",
            "createdacc": "تم إنشاء الحساب",
            "errorhaveacc": "لديك بالفعل حساب",
            "titleuser": "معلومات الحساب",
            "userid": "معرّف المستخدم",
            "username": "اسم المستخدم",
            "coins": "الرصيد",
            "createdAt": "تم إنشاء الحساب في",
            "thx": "شكرًا لاستخدام خدماتنا",
            "donesecured": "تم تنشيط رؤية الرصيد المؤمن",
            "blacklisted": "تمت الإضافة لقائمة السوداء",
            "yes": "نعم",
            "no": "لا",
            "unknown": "غير معروف",
            "premium": "بريميوم",
            "scammerd": "نصاب",
            "blacklistedmsg": "تمت إضافتك إلى قائمة السوداء بسبب سلوك غير لائق",
            "scummermsg": "تمت إدراجك كنصاب بسبب سلوك غير لائق",
            "displayname": "اسم العرض"
        },
        "captcha": {
            transferterramodal: "تحويل تيرا",
            "usershouldhaveacc": "يجب أن يكون للشخص الذي تقوم بالتحويل إليه حساب.",
            "errorcoinsenough": "ليس لديك ما يكفي من التيرا لهذا.",
            "passwordtitle": "تحقق من كلمة المرور",
            "nopassword": "يجب عليك تحديد كلمة المرور.",
            "waiting": "في انتظار <thing>",
            "errorcaptchashape": "لقد اخترت شكل الكابتشا الخطأ.",
            "shapetype": "يرجى تحديد الشكل الصحيح. اسم الشكل: [shape]",
            "passwordtype": "يرجى النقر على الزر أدناه وإدخال كلمة مرور محفظتك.",
            "passwordmodal": "أدخل كلمة المرور الخاصة بك",
            "passwordbtn": "حقل كلمة المرور",
            "errorpassword": "كلمة المرور التي تحاول إدخالها غير صحيحة.",
            "errornoacc": "قم بإنشاء حساب لتسجيل معلوماتك وإنشاء محفظتك الخاصة."
        },
        "premium": {
            "errorhavepremium": "لديك اشتراك بريميوم بالفعل.",
            "titlebuy": "لنشتري بريميوم",
            "month": "الشهر",
            "year": "السنة",
            "modalreporttitle": "مشكلة في البوت",
            "labelreport": "شرح المشكلة",
            "donetransferacc": "تم نقل الحساب بنجاح",
            "haveacctransfer": "يجب ألا يكون للشخص حساب للتحويل إليه.",
            "modaltransfertitle": "نقل البيانات",
            "labeltransfer": "أدخل معرّف المستلم",
            "nopre": "ليس لديك اشتراك بريميوم للقيام بذلك.",
            "createbtn": "فتح حساب",
            "deletebtn": "إغلاق الحساب",
            "dailybtn": "راتب يومي",
            "transferbtn": "نقل بياناتي",
            "reportbtn": "الإبلاغ",
            "descpanel": "يمكنك فتح حسابك وإغلاقه واستلام راتبك اليومي بطريقة محمية. وإذا كان لديك اشتراك بريميوم شهري، يمكنك نقل معلوماتك إلى حساب آخر.",
            "titlepanel": "التحكم",
            "createdAt": "تم الاشتراك في",
            "endsAt": "ينتهي في",
            "days": "الوقت المتبقي",
            "titleinfo": "معلومات الاشتراك"
        },
        "done": "**تم بنجاح [emoji]**",
        "error": "**حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.**",
        "setupdone": "**تم العملية بنجاح**",
        "donedeleted": "**تم الحذف بنجاح [emoji]**"
    },
    fr: {
        card: {
            donetransfer: "Transfert réussi",
            cardnumbererror: "Le numéro de carte est incorrect",
            coinserror: "Vous n'avez pas assez de pièces",
            cvverror: "Votre CVV est incorrect",
            userdoesnthave: "L'utilisateur n'a pas de carte",
            balance: "Votre solde est : [amount] [emoji]",
            errorhavecard: "Vous avez déjà une carte",
            erronohavecard: "Vous n'avez pas de carte pour faire cela",
            donecard: "Carte créée avec succès"
        },
        components: {
            createAccount: {
                verified: "Votre compte est déjà vérifié",
                codeerr: "Le code que vous avez entré est incorrect",
                code: "Écrivez le code de vérification",
                errtime: "Le temps est écoulé, veuillez recréer le compte",
                labelverify: "Vérifiez votre e-mail",
                senddone: "Envoyé à votre e-mail",
                lastNameText: "Tapez votre nom de famille",
                firstNameText: "Tapez votre prénom",
                modaltitle: "Créer un compte",
                textGmail: "Entrez votre e-mail",
                emailVaild: "L'email doit contenir @example.com"
            }
        
    
    

        },



        "help": {
            "placeholderques": "Vous pouvez trouver votre question ici",
            "bank": "Banque",
            "title": "Liste d'aide",
            "description": "**Explorons ensemble les commandes du bot !**"
        },

        "questions": {
            "help": [
                { "label": "Comment créer un compte ?", "value": "q0", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Quelle est l'idée du bot ?", "value": "q1", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Comment puis-je augmenter ma monnaie ?", "value": "q2", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Comment ne pas perdre les crédits que j'ai ?", "value": "q3", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Où sont les serveurs qui traitent avec Tera ?", "value": "q4", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Pourquoi devrais-je convertir mes crédits en Tera ?", "value": "q5", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Le bot est-il uniquement une monnaie ?", "value": "q6", "emoji": "<:Frame56:1240761318886346833>" }
            ]
        },
        "answers": {
            "help": [
                { "label": "Allez sur notre serveur ou un serveur contenant le tableau de bord", "value": "q0" },
                { "label": "Notre bot est un bot avec une monnaie et un bot de concours connu sous le nom de Giveaway Bot. Notre bot se distingue par son développement.\nEn bref, vous pouvez convertir vos crédits en notre monnaie ou collecter et échanger avec d'autres dans un environnement protégé des escrocs.\nSi vous êtes escroqué, vos droits seront retournés et déduits de l'escroc.\nSi vous souhaitez retourner les crédits que vous avez, ils seront retournés mais avec une déduction de 5%.", "value": "q1" },
                { "label": "Vous recevez le quotidien et vous pouvez également échanger en toute confiance que vos droits ne sont pas perdus. Nous fournirons bientôt un système fort.", "value": "q2" },
                { "label": "Vous convertissez vos crédits en Tera et traitez avec les commerçants. Si quelqu'un vous escroque, nous vous retournerons vos droits.", "value": "q3" },
                { "label": "Vous entrez sur notre serveur et trouvez une salle avec des personnes soutenant la monnaie et traitant avec elle.", "value": "q4" },
                { "label": "Vous allez sur notre serveur, la salle 'buy', ouvrez un ticket et convertissez vos crédits en Tera.", "value": "q5" },
                { "label": "Non, notre bot a également une fonctionnalité de concours.", "value": "q6" }
            ]
        },




        "ping": {
            "message": "**[ping] MS**"
        },
        "cooldown": {
            "message": "**Vous devez attendre <duration> pour utiliser cette commande**"
        },
        "owner": {
            "message": "**Cette commande est réservée à l'équipe du bot uniquement**"
        },
        "jail": {
            "jailtitle": "Arnaqueurs",
            "usertlabel": "La personne qui s'est fait arnaquer",
            "amountscummer": "Le montant qui a été escroqué",
            "scammeridlabel": "Entrez l'ID de l'escroc"
        },
        "language": {
            "placeholder": "Veuillez choisir la langue",
            "done": "**La langue a été définie avec succès**"
        },
        "panel": {
            "nopanel": "**Désolé, votre serveur ne fait pas partie de nos serveurs **"
        },
        scammer: {
            reason: "Quelle est la raison",
            doneSearch: "Recherche réussie",
            doneAdded: "**Escroc ajouté avec succès**",
            doneDeleted: "**L'escroc a été débanni avec succès**",
            labeladd: "Signaler un escroc",
            findScummer: "Trouver un escroc",
            deleteScummer: "Débannir un escroc",
            title: "Panneau des escrocs",
            ownershippremiusson: "Vous devez être propriétaire du serveur",
            desc: "**Nous protégeons notre monnaie contre toute tentative d'escroquerie. Lorsqu'un signalement est fait, nous examinons les preuves minutieusement et rétablissons la justice à son propriétaire, tout en ajoutant l'escroc à la liste noire.**"
        },
        "giveaway": {
            "lengtherror": "Le nombre maximum de cadeaux est de 15",
            "timeerror": "**Erreur de format de temps, il doit inclure s, m, h, d et la durée maximale est de 14 jours**",
            "counterror": "**Le nombre de cadeaux doit être de 5 ou moins**",
            "donemaked": "**Cadeau(s) créé(s) avec succès**",
            "rerollmsg": "**[emoji] Cadeau réattribué avec succès**",
            "unpausemsg": "**[emoji] Cadeau reprise réussie**",
            "pausemsg": "**[emoji] Cadeau en pause avec succès**",
            "deletemg": "**[emoji] Cadeau supprimé avec succès**",
            "endmsg": "**[emoji] Cadeau terminé avec succès**",
            "error": "**[emoji] Une erreur s'est produite**",
            "giveawaycontent": "[emoji] **Nouveau cadeau** [emoji]",
            "giveawayEnded": "[emoji] **Nouveau cadeau** [emoji]",
            "drawing": "Temps restant : {timestamp}",
            "dropMessage": "Soyez le premier à participer [emoji] !",
            "inviteToParticipate": "Participez en cliquant sur [emoji] ci-dessous",
            "winMessage": "**Félicitations aux gagnants** ( {winners} ) Vous avez gagné **{this.prize}** [emoji]",
            "winners": "Gagnant(s)",
            "endedAt": "Se termine à",
            "hostedBy": "Organisé par : {this.hostedBy}",
            "noWinner": "**Cadeau annulé faute de participants**"
        },
        "errorr": {
            "deleteno": "Je ne peux pas trouver ce que vous voulez supprimer",
            "passworderror": "Le mot de passe que vous avez entré n'est pas correct ou le nouveau mot de passe ne correspond pas au mot de passe de confirmation"
        },
        "privatemode": {
            "enabled": "**Mode de compte privé activé**",
            "disabled": "**Mode de compte privé désactivé**"
        },
        "permissionme": "**Je n'ai pas `<permission>` pour utiliser cette commande.** ",
        "permission": "**Vous n'avez pas `<permission>` pour utiliser cette commande. **",

        "private": {
            "premiumBuy": "[emoji] Abonnement acheté avec succès\nUtilisateur Premium : **[buyer]**\nJours : **[days]**\nCode : **[code]**\nHeure : **[time]**\nRaison\n||`[reason]`||\n**Merci d'utiliser nos services et d'acheter nos commandes premium, nous espérons que vous êtes satisfait de nos services [emoji2]**",
            "passworddoneset": "Mot de passe défini avec succès",
            "lastpasswordtext": "Entrez votre dernier mot de passe",
            "newpassword": "Entrez le mot de passe que vous souhaitez",
            "cofirmpassword": "Confirmez le mot de passe",
            "modaltitlepasswordedit": "Définir le mot de passe",
            "donetransfersend": "**[emoji] <@[userr]>,** a reçu **[amount] de Terra(s)** de <@[usert]>",
            "donetransfer": "Transfert terminé avec succès",
            "transfer": "[emoji] Nouveau virement bancaire\nRécepteur : **[receiver]**\nDonateur : **[giver]**\nMontant : **[amount]**\nTemps : **[time]**\nRaison\n||`[reason]`||\n**Merci d'utiliser nos services, nous espérons que vous êtes satisfait de nos services [emoji2]**",
            "transferterrauser": "ID du destinataire",
            "transferterraamount": "Montant",
            "transferterrareason": "Raison du transfert",
            "donereport": "Signalé",
            "donedelete": "Supprimé avec succès",
            "errordaily": "Une erreur s'est produite",
            "dailytaken": "Journalier pris",
            "wait": "Vous devez attendre [time]",
            "createdacc": "Compte créé",
            "errorhaveacc": "Vous avez déjà un compte",
            "titleuser": "Informations sur le compte",
            "userid": "ID utilisateur",
            "username": "Nom d'utilisateur",
            "coins": "Solde",
            "createdAt": "Compte créé à",
            "thx": "Merci d'utiliser notre service",
            "donesecured": "Visibilité du solde sécurisée activée",
            "blacklisted": "Sur liste noire",
            "yes": "Oui",
            "no": "Non",
            "unknown": "Inconnu",
            "premium": "Premium",
            "scammerd": "Arnaqueur",
            "blacklistedmsg": "Vous avez été mis sur liste noire pour inconduite",
            "scummermsg": "Vous avez été répertorié comme arnaqueur pour inconduite",
            "displayname": "Nom d'affichage"
        },
        "captcha": {
            transferterramodal: "Transfert Terra",
            "usershouldhaveacc": "La personne à qui vous transférez doit avoir un compte.",
            "errorcoinsenough": "Vous n'avez pas assez de Terra pour cela.",
            "passwordtitle": "Vérifiez le mot de passe",
            "nopassword": "Vous devez spécifier le mot de passe.",
            "waiting": "En attente de <thing>",
            "errorcaptchashape": "Vous avez choisi la mauvaise forme de captcha.",
            "shapetype": "Veuillez sélectionner la forme correcte. Nom de la forme : [shape]",
            "passwordtype": "Veuillez cliquer sur le bouton ci-dessous et entrer votre mot de passe de portefeuille.",
            "passwordmodal": "Entrez votre mot de passe",
            "passwordbtn": "Champ de mot de passe",
            "errorpassword": "Le mot de passe que vous essayez d'entrer est incorrect.",
            "errornoacc": "Créez un compte pour enregistrer vos informations et créer votre propre portefeuille."
        },
        "premium": {
            "errorhavepremium": "Vous avez déjà un abonnement premium.",
            "titlebuy": "Acheter Premium",
            "month": "Mois",
            "year": "An",
            "modalreporttitle": "Problème de bot",
            "labelreport": "Expliquer le problème",
            "donetransferacc": "Compte transféré avec succès",
            "haveacctransfer": "La personne ne doit pas avoir de compte à transférer.",
            "modaltransfertitle": "Transfert de données",
            "labeltransfer": "Entrez l'ID du destinataire",
            "nopre": "Vous n'avez pas d'abonnement premium pour faire cela.",
            "createbtn": "Ouvrir un compte",
            "deletebtn": "Fermer le compte",
            "dailybtn": "Salaire quotidien",
            "transferbtn": "Transférer mes données",
            "reportbtn": "Rapport",
            "descpanel": "Vous pouvez ouvrir et fermer votre compte, et recevoir votre salaire quotidien de manière sécurisée. Si vous avez un abonnement premium mensuel, vous pouvez transférer vos informations vers un autre compte.",
            "titlepanel": "Contrôle",
            "createdAt": "Abonné à",
            "endsAt": "Se termine à",
            "days": "Temps restant",
            "titleinfo": "Informations sur l'abonnement"
        },
        "done": "**Succès [emoji]**",
        "error": "**Une erreur s'est produite. Veuillez réessayer plus tard.**",
        "setupdone": "**Opération terminée avec succès**",
        "donedeleted": "**Supprimé avec succès [emoji]**"
    },
    tr: {
        card: {
            donetransfer: "Transfer başarıyla gerçekleştirildi",
            cardnumbererror: "Kart numarası yanlış",
            coinserror: "Yeterli madeni paranız yok",
            cvverror: "CVV kodunuz yanlış",
            userdoesnthave: "Kullanıcının kartı yok",
            balance: "Bakiyeniz: [amount] [emoji]",
            errorhavecard: "Zaten bir kartınız var",
            erronohavecard: "Bunu yapmak için kartınız yok",
            donecard: "Kartınız oluşturuldu"
        },
      
            components: {
                createAccount: {
                    verified: "Hesabınız zaten doğrulandı",
                    codeerr: "Girdiğiniz kod yanlış",
                    code: "Doğrulama kodunu yazın",
                    errtime: "Süre doldu, lütfen hesabı yeniden oluşturun",
                    labelverify: "E-postanızı doğrulayın",
                    senddone: "E-postanıza gönderildi",
                    lastNameText: "Soyadınızı yazın",
                    firstNameText: "Adınızı yazın",
                    modaltitle: "Hesap oluştur",
                    textGmail: "E-posta adresinizi girin",
                    emailVaild: "E-posta @example.com içermelidir"
                }
         
        
        },




        "help": {
            "placeholderques": "Sorunuzu burada bulabilirsiniz",
            "bank": "Banka",
            "title": "Yardım Listesi",
            "description": "**Bot komutlarını birlikte keşfedelim!**"
        },

        "questions": {
            "help": [
                { "label": "Hesap nasıl oluşturulur?", "value": "q0", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Botun fikri nedir?", "value": "q1", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Para birimimi nasıl artırabilirim?", "value": "q2", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Sahip olduğum kredileri nasıl kaybetmem?", "value": "q3", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Tera ile işlem yapan sunucular nerede?", "value": "q4", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Neden kredilerimi Tera'ya dönüştürmeliyim?", "value": "q5", "emoji": "<:Frame56:1240761318886346833>" },
                { "label": "Bot sadece bir para birimi mi?", "value": "q6", "emoji": "<:Frame56:1240761318886346833>" }
            ]
        },
        "answers": {
            "help": [
                { "label": "Sunucumuza veya kontrol panelini içeren bir sunucuya gidin", "value": "q0" },
                { "label": "Botumuz, bir para birimi ve çekiliş botu olarak bilinen Giveaway Bot'a sahip bir bottur. Botumuz gelişimi ile öne çıkıyor.\nKısacası, kredilerinizi para birimimize dönüştürebilir veya başkalarıyla korumalı bir ortamda toplayıp ticaret yapabilirsiniz.\nDolandırılırsanız, haklarınız iade edilecek ve dolandırıcıdan kesilecektir.\nElinizdeki kredileri geri almak isterseniz, %5 kesinti ile geri verilecektir.", "value": "q1" },
                { "label": "Günlüğü alıyorsunuz ve haklarınızın kaybolmayacağına güvenerek ticaret yapabilirsiniz. Yakında güçlü bir sistem sağlayacağız.", "value": "q2" },
                { "label": "Kredilerinizi Tera'ya dönüştürür ve tüccarlarla işlem yaparsınız. Biri sizi dolandırırsa, haklarınızı geri vereceğiz.", "value": "q3" },
                { "label": "Sunucumuza girip, para birimini destekleyen ve işlem yapan insanları bulabileceğiniz bir odaya giriyorsunuz.", "value": "q4" },
                { "label": "Sunucumuza, 'buy' odasına gidin, bir bilet açın ve kredilerinizi Tera'ya dönüştürün.", "value": "q5" },
                { "label": "Hayır, botumuzda ayrıca çekiliş özelliği de bulunmaktadır.", "value": "q6" }
            ]
        },




        "ping": {
            "message": "**[ping] MS**"
        },
        "cooldown": {
            "message": "**Bu komutu kullanmak için <duration> beklemelisiniz**"
        },
        "owner": {
            "message": "**Bu Komut Yalnızca Bot Ekibi İçindir**"
        },
        "jail": {
            "jailtitle": "Dolandırıcılar",
            "usertlabel": "Dolandırılan kişi",
            "amountscummer": "Dolandırılan miktar",
            "scammeridlabel": "Dolandırıcı Kimliğini Girin"
        },
        "language": {
            "placeholder": "Lütfen dili seçin",
            "done": "**Dil başarıyla ayarlandı**"
        },
        "panel": {
            "nopanel": "**Üzgünüz, sunucunuz bizim sunucularımızdan biri değil**"
        },
        scammer: {
            reason: "Sebep nedir",
            doneSearch: "Başarıyla arandı",
            doneAdded: "**Sahtekar başarıyla eklendi**",
            doneDeleted: "**Sahtekarın yasağı başarıyla kaldırıldı**",
            labeladd: "Sahtekarı Bildir",
            findScummer: "Sahtekarı Bul",
            deleteScummer: "Sahtekarın Yasağını Kaldır",
            title: "Sahtekarlar Paneli",
            ownershippremiusson: "Sunucu sahibi olmalısınız",
            desc: "**Para birimimizi her türlü dolandırıcılık girişiminden koruyoruz. Bildirildiğinde, kanıtları titizlikle inceleriz ve adaleti sahibine geri veririz, sahtekarı kara listeye ekleriz.**"
        },
        "giveaway": {
            "lengtherror": "Maksimum çekiliş sayısı 15'tir",
            "timeerror": "**Zaman biçimi hatası, s, m, h, d içermeli ve maksimum süre 14 gün olmalıdır**",
            "counterror": "**Çekiliş sayısı 5 veya daha az olmalıdır**",
            "donemaked": "**Çekiliş(ler) başarıyla oluşturuldu**",
            "rerollmsg": "**[emoji] Çekiliş yeniden yapıldı**",
            "unpausemsg": "**[emoji] Çekiliş devam ettirildi**",
            "pausemsg": "**[emoji] Çekiliş başarıyla durduruldu**",
            "deletemg": "**[emoji] Çekiliş başarıyla silindi**",
            "endmsg": "**[emoji] Çekiliş başarıyla sonlandırıldı**",
            "error": "**[emoji] Bir hata oluştu**",
            "giveawaycontent": "[emoji] **Yeni Çekiliş** [emoji]",
            "giveawayEnded": "[emoji] **Yeni Çekiliş** [emoji]",
            "drawing": "Kalan Süre: {timestamp}",
            "dropMessage": "İlk katılan ol [emoji] !",
            "inviteToParticipate": "[emoji] aşağıdaki bağlantıyı tıklayarak katılın",
            "winMessage": "**Kazanan(lar)ı Tebrikler** ( {winners} ) **{this.prize}** kazandınız [emoji]",
            "winners": "Kazanan(lar)",
            "endedAt": "Bitiş tarihi",
            "hostedBy": "Tarafından düzenlenen: {this.hostedBy}",
            "noWinner": "**Katılımcı eksikliği nedeniyle çekiliş iptal edildi**"
        },
        "errorr": {
            "deleteno": "Silmek istediğiniz şeyi bulamıyorum",
            "passworderror": "Girdiğiniz şifre doğru değil veya yeni şifre onay şifresiyle eşleşmiyor"
        },
        "privatemode": {
            "enabled": "**Özel hesap modu etkinleştirildi**",
            "disabled": "**Özel hesap modu devre dışı bırakıldı**"
        },
        "permissionme": "**Bu komutu kullanmak için `<permission>` izniniz yok.** ",
        "permission": "**Bu komutu kullanmak için `<permission>` izniniz yok. **",

        "private": {
            "premiumBuy": "[emoji] Abonelik başarıyla satın alındı\nPremium Kullanıcı: **[buyer]**\nGünler: **[days]**\nKod: **[code]**\nZaman: **[time]**\nNeden\n||`[reason]`||\n**Hizmetlerimizi kullanarak ve premium komutlarımızı satın alarak bizi tercih ettiğiniz için teşekkür ederiz, umarız hizmetlerimizden memnun kalırsınız [emoji2]**",
            "passworddoneset": "Şifre başarıyla ayarlandı",
            "lastpasswordtext": "Son şifrenizi girin",
            "newpassword": "Kullanmak istediğiniz şifreyi girin",
            "cofirmpassword": "Şifreyi onaylayın",
            "modaltitlepasswordedit": "Şifre Ayarla",
            "donetransfersend": "**[emoji] <@[userr]>,** <@[usert]> tarafından **[amount] Terra(s)** aldı",
            "donetransfer": "Transfer başarıyla tamamlandı",
            "transfer": "[emoji] Yeni banka transferi\nAlıcı: **[receiver]**\nVeren: **[giver]**\nMiktar: **[amount]**\nZaman: **[time]**\nNeden\n||`[reason]`||\n**Hizmetlerimizi kullanarak, umarız hizmetlerimizden memnun kalırsınız [emoji2]**",
            "transferterrauser": "Alıcı Kimliği",
            "transferterraamount": "Miktar",
            "transferterrareason": "Transfer Nedeni",
            "donereport": "Bildirildi",
            "donedelete": "Başarıyla silindi",
            "errordaily": "Bir hata oluştu",
            "dailytaken": "Günlük alındı",
            "wait": "Beklemelisiniz [time]",
            "createdacc": "Hesap oluşturuldu",
            "errorhaveacc": "Zaten bir hesabınız var",
            "titleuser": "Hesap Bilgileri",
            "userid": "Kullanıcı Kimliği",
            "username": "Kullanıcı Adı",
            "coins": "Bakiye",
            "createdAt": "Hesap şurada oluşturuldu",
            "thx": "Hizmetimizi kullandığınız için teşekkür ederiz",
            "donesecured": "Güvenli bakiye görünürlüğü etkinleştirildi",
            "blacklisted": "Kara listeye alındı",
            "yes": "Evet",
            "no": "Hayır",
            "unknown": "Bilinmiyor",
            "premium": "Premium",
            "scammerd": "Dolandırıcı",
            "blacklistedmsg": "Hatalı davranış nedeniyle kara listeye alındınız",
            "scummermsg": "Hatalı davranış nedeniyle dolandırıcı olarak listelendiniz",
            "displayname": "Görüntülenen Ad"
        },
        "captcha": {
            transferterramodal: "Transfer Terra",
            "usershouldhaveacc": "Transfer ettiğiniz kişinin bir hesabı olmalı.",
            "errorcoinsenough": "Bunun için yeterli Terra'nız yok.",
            "passwordtitle": "Şifreyi Doğrula",
            "nopassword": "Şifreyi belirtmelisiniz.",
            "waiting": "<thing> için bekleniyor",
            "errorcaptchashape": "Yanlış captcha şekli seçtiniz.",
            "shapetype": "Lütfen doğru şekli seçin. Şekil adı: [shape]",
            "passwordtype": "Lütfen aşağıdaki düğmeye tıklayın ve cüzdan şifrenizi girin.",
            "passwordmodal": "Şifrenizi girin",
            "passwordbtn": "Şifre Alanı",
            "errorpassword": "Girmeye çalıştığınız şifre yanlış.",
            "errornoacc": "Bilgilerinizi kaydetmek ve kendi cüzdanınızı oluşturmak için bir hesap oluşturun."
        },
        "premium": {
            "errorhavepremium": "Zaten premiumunuz var.",
            "titlebuy": "Premium Satın Alalım",
            "month": "Ay",
            "year": "Yıl",
            "modalreporttitle": "Bot Sorunu",
            "labelreport": "Sorunu açıklayın",
            "donetransferacc": "Hesap başarıyla transfer edildi",
            "haveacctransfer": "Kişinin transfer edilecek bir hesabı olmamalıdır.",
            "modaltransfertitle": "Veri Transferi",
            "labeltransfer": "Alıcı Kimliğini Girin",
            "nopre": "Bunu yapmak için premium aboneliğiniz yok.",
            "createbtn": "Hesap Aç",
            "deletebtn": "Hesabı Kapat",
            "dailybtn": "Günlük Maaş",
            "transferbtn": "Verilerimi Aktar",
            "reportbtn": "Rapor",
            "descpanel": "Hesabınızı açabilir ve kapatabilir, günlük maaşınızı güvenli bir şekilde alabilirsiniz. Aylık bir premium aboneliğiniz varsa, bilgilerinizi başka bir hesaba aktarabilirsiniz.",
            "titlepanel": "Kontrol",
            "createdAt": "Şurada Abone Oldu",
            "endsAt": "Şurada Biter",
            "days": "Kalan Süre",
            "titleinfo": "Abonelik Bilgileri"
        },
        "done": "**Başarı [emoji]**",
        "error": "**Bir hata oluştu. Lütfen daha sonra tekrar deneyin.**",
        "setupdone": "**İşlem başarıyla tamamlandı**",
        "donedeleted": "**Başarıyla silindi [emoji]**"
    }






}

export default Language;
