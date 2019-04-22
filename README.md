# isMail Valid?

This package basically checks whether an email address is valid. The main aim is to check whether they are suitable for gmail, outlook and yandex e-mail address standards.


# Installation

    npm i -S ismail

## Import

    const ismail = require("ismail")
or
    
    import * as ismail from "ismail"

## Request

    ismail("thismail@isvalid.com")

## Output

    {
      "valid": true,
      "mail": "thismail@isvalid.com"
    }

# Prevent multiple using

This can be useful if you are registering with email addresses or if you keep a record.
Some services supported `'mailname+tag@service.dom'` but actually equal to `mailname@service.dom`

Gmail, king of the common addresses.

> `w.i.l.l.i.a.m+hello+my+dear@googlemail.com => william@gmail.com`

**If we try this;**

    ismail("w.i.l.l.i.a.m+hello+my+dear@googlemail.com")

**Output**

    {
      "valid": true,
      "mail": "w.i.l.l.i.a.m+hello+my+dear@googlemail.com",
      "simplify": "william@gmail.com"
    }

**Maybe some services support only one '+'**

    ismail("look_at-this+oh+no@outlook.com")

**Output**

    {
      "valid": false,
      "mail": "look_at-this+oh+no@outlook.com"
    }


> *These are current rules. Different rules may be applied in the past and a currently available address may not comply with these rules. I'm not sure.*
