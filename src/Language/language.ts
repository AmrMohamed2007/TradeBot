const Language = {
    ar: {
        ping: {
            message: "**[ping] MS**"
        },
        cooldown: {
            message: "لأستخدام الأمر مره اخري** <duration> يرجي انتظار **"
        },
        owner: {
            message:"**هذا الأمر خاص بمطورين فقط لا يمكنك استخدامه**"
        },
        jail:{
            jailtitle:"النصابين",
            usertlabel:"الشخص التي تم نصب عليه",
            amountscummer:"كمية التي تم نصب فيها",
            scammeridlabel:"قم بكتابة ايدي النصاب",
        },
        language:{
            placeholder:"قم بأخيتار اللغة",
            done:"**تم تحديد اللغة بنجاح**"
        },
        panel:{
            nopanel:"**عذرا سيرفرك ليس سيرفر وسطاء تابع لنا**"
        },
        scammer: {
            doneSearch:"تم البحث بنجاح",
            doneAdded:"**تم اضافة النصاب بنجاح**",
            doneDeleted:"**تم بنجاح إفراج عن النصاب**",
            labeladd:"الإبلاغ علي نصاب",
            findScummer:"البحث علي نصاب",
            deleteScummer:"الإفراج عن نصاب",
            title:"لوحة النصابين",
            desc:"**نحن نقوم بحماية العملة الخاصه بنا من اي عملية نصب\nمن خلال عند الإبلاغ نحن نفحص صحة الدلائل ونقوم بإرجاع الحق لصاحبه واعطاء بلاك لست ل لنصاب**"
        },
        giveaway:{
            lengtherror:"اقصي عدد للمسابقات هو 15",
            timeerror:"**خطأ في الوقت يجب ان يحتوي علي s,m,h,d واقصي مده هي 14 يوم**",
            counterror:"**عدد المسابقات يجب ان يكون 5 او اقل**",
            donemaked:"**تم عمل المسابقة/ات بنجاح**",
            rerollmsg:"**[emoji] لقد تم إعادة اللف  بنجاح**",
            unpausemsg:"**[emoji] لقد تم إالفاء الإيقاف المؤقت للمسابقة بنجاح**",
            pausemsg:"**[emoji] لقد تم إيقاف المسابقة مؤقتًا بنجاح**",
            deletemg:"**[emoji] لقد تم مسح المسابقة بنجاح**",
            endmsg:"**[emoji] لقد تم انهاء المسابقة بنجاح**",
            error:"**[emoji] لقد حدث خطأ ما   **",
            giveawaycontent:"[emoji] **مسابقة جديدة** [emoji]",
            giveawayEnded:"[emoji] **مسابقة جديدة** [emoji]",
            drawing:"الوقت المتبقي : {timestamp}",
            dropMessage:"كن اول شخص يشارك [emoji] !",
            inviteToParticipate:"قم بالمشاركة من خلال الضغط علي [emoji] بالأسفل",
            winMessage:"**مبارك للفائزين** ( {winners} ) لقد ربحت/و **{this.prize}** [emoji]",
            winners:"فائز/ين",
            endedAt:"ينتهي في",
            hostedBy:"صُنع من : {this.hostedBy}",
            noWinner:"**تم الغاء الجيف اواي نظرا لعدم وجود مشاركين**"
        },
        errorr:{
            deleteno:"لا يمكنني ايجاد ماتريد مسحه",
            passworderror:"Password what you enterd not correct or new password doesnt equal confirm password"
        },
        privatemode: {
            enabled:"تم تفعيل خاصيه الحساب الخاص",
            disabled:"تم تعطيل خاصيه الحساب الخاص"
        },
        permissionme: " `<permission>`ليس لدي هذا البرمشن  ",
        permission: "`<permission>` ليس لديك هذا البرمشن",
      
        private: {
            passworddoneset:"تم تحديد الباسورد بنجاح",
            lastpasswordtext:"قم بكتابة اخر باسورد",
            newpassword:"قم بكتابة الباسورد التي تريده",
            cofirmpassword:"قم بكتابته مره اخري",
            "modaltitlepasswordedit":"تحديد باسورد",
            donetransfersend: `**[emoji] <@[userr]>,** Recieved **[amount] Of Terra(s)** from <@[usert]>`,
            "donetransfer": "تمت العملية بنجاح",
            transfer: `[emoji] تحويل بنكي جديد\n
Receiver: **[receiver]**\n
Giver: **[giver]**\n
Amount: **[amount]**\n
Time: **[time]**\n
Reason\n||\`\`\`[reason]\`\`\`||
**Thx for using our services , we hope you happy with our services [emoji2]**`,
            transferterrauser: "ايدي مستلم",
            transferterraamount: "المبلغ",
            transferterrareason: "سبب التحويل",
            donereport: "تم ابلاغ",
            donedelete: "تم تمسح بنجاخ",
            errordaily: "ا",
            dailytaken: "تم اخذ الدايلي  ",
            wait: "You should wait [time]",
            createdacc: "الاكونت اتعمل",
            errorhaveacc: "لديك اكونت بالفعل",
            titleuser: "معلومات الحساب",
            userid: "معرف الشخص",
            username: "اسم المستخدم",
            coins: "الرصيد",
            createdAt: "تم فتح حساب في",
            thx: "شكرا لك علي التعامل مع خدمتنا",
            donesecured: "تم تفعيل خاصية حماية رؤية الرصيد",
            blacklisted: "موجود في قائمة السوداء",
            yes: "نعم",
            no: "لا",
            unknown:"لم يتم تعرف عليه",
            premium: "عضو مميز",
            scammerd:"نصاب",
            blacklistedmsg: "لقد تم وضعك في القائمة السوداء لسوء تعامل مع خدمتنا",
            scummermsg: "لقد تم وضعك في قائمة النصابين لسوء تعامل مع خدمتنا",
            displayname: "الأسم الظاهري"
        },
        captcha: {
            usershouldhaveacc: "لازم الشخص ال تحولو يكون عندو حساب يبني",
            errorcoinsenough: "لا يوجد لديك تيرا كافيه لهذا",
            passwordtitle: "تحقق من رقم سري",
            nopassword: "لازم تحدد باسورد عشان تحول ي اهطل",
            waiting: "waiting for <thing>",
            errorcaptchashape: "لقد اخترت كابتشا خاطئة",
            shapetype: "يرجي اختيار الشكل الصحيح اسم الشكل : [shape]",
            passwordtype: "ارجوك قم بضغط علي الزر التي بالأسفل وكتابة باسورد محفظتك",
            passwordmodal: "قم بكتابة الباسورد الخاص بك",
            passwordbtn: "حقل الباسورد",
            errorpassword: "الرقم السري التي تحاول ادخاله خاطئ",
            errornoacc: "قم بعمل حساب لتسجيل معلوماتك وعمل محفظة خاصه بك"
        },
        premium: {
            errorhavepremium: "عندك برمويم",
            titlebuy: "Let's Buy Premium",
            month: "Month",
            year: "Year",
            modalreporttitle: "مشكلة في البوت",
            labelreport: "قم بتوضيح العطل",
            donetransferacc: "تم نقل الحساب بنجاح",
            haveacctransfer: "يجب ان يكون الشخص ليس لديه اكونت لنقل اليه",
            modaltransfertitle: "نقل بيانات ",
            labeltransfer: "قم بكتابة بأيدي الشخص الثاني",
            "nopre": "ليس لديك اشتراك برميوم لفعل ذلك",
            "createbtn": "فتح حساب",
            "deletebtn": "قفل الحساب",
            "dailybtn": "الراتب اليومي",
            "transferbtn": "نقل معلوماتي",
            "reportbtn": "الإبلاغ",
            descpanel: "بانل جامدة من الاخر ي فاخر",
            titlepanel: "التحكم",
            createdAt: "تم اشتراك في",
            endsAt: "ينتهي في",
            days: "الوقت المتبقي",
            titleinfo: "معلومات اشتراكك",

        },
        done:"**تم بنجاح [emoji]**",
        error: "لقد حدث خطأ ما",
        setupdone: "تم التسطيب بنجاح",
        donedeleted:"**تم الإزالة بنجاح [emoji]**"
    },
    en: {
        ping: {
            message: "Ping :  [ping] MS"
        },
        cooldown: {
            message: "You are on <duration> Cooldwon"
        },
        owner: {
            message: "You are not from developers"
        },
        permissionme: "I Dont have `<permission>` Permission",
        permission: "You Dont have `<permission>` Permission",
        setupdone: "done setup panel",
        private: {
            dailytaken: "تم اخذ الدايلي  ",
            createdacc: "الاكونت اتعمل",
            errorhaveacc: "لديك اكونت بالفعل",
            titleuser: "Account Data",
            userid: "User Id",
            username: "Username",
            coins: "Terra(s)",
            createdAt: "Opened In",
            thx: "Thx for trading with terra !",
            donesecured: "Secure Mode was enabled",
            blacklisted: "Blacklisted",
            yes: "Yes",
            no: "No",
            blacklistedmsg: "You were added to blacklist,because you broke the rules",
            displayname: "Display Name"
        },
        captcha: {
            waiting: "waiting for <thing>",
            errorcaptchashape: "خطأ في كابتشا",
            passwordtype: "Please click in this button below and type your password",
            passwordmodal: "Please type your password",
            passwordbtn: "Password Inputc",
            errorpassword: "Password is incorrect !",
            errornoacc: "You should Create account"
        },
        premium: {
            "nopre": "ليس لديك اشتراك برميوم لفعل ذلك",
            "createbtn": "فتح حساب",
            "deletebtn": "قفل الحساب",
            "dailybtn": "الراتب اليومي",
            "transferbtn": "نقل معلوماتي",
            "reportbtn": "الإبلاغ",
            descpanel: "بانل جامدة من الاخر ي فاخر",
            titlepanel: "التحكم"
        },
        error: "Somthing went wrong,please try again later"
    },

}

export default Language;
