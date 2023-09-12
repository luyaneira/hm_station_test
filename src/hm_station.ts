/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let doVotingPopup: any = undefined;
var currentWebsite: any = undefined;

var labelClose = "Schließen";

var layerJobs1 = "popUpJobs1";
var layerJobs2 = "popUpJobs2";
var popUpJobs1 = "jobs_1";
var popUpJobs2 = "jobs_2";
var msgJobs = "Finde die passende Einstiegsmöglichkeit für dich";
var labelJobs = "Jobs anzeigen";
var urlJobs = "https://db.jobs/service/search/de-de/5441588?qli=true&query=&itemsPerPage=10&pageNum=0&positiontype=Ausbildung&positiontype=Duales+Studium";
                
var layerJobProfiler = "popUpJobProfiler";
var popUpJobProfiler = "jobProfiler";
var msgJobProfiler = "Du weißt noch nicht, wohin es gehen soll?";
var labelJobProfiler = "Finde es hier heraus!";
var urlJobProfiler = "https://jobkompass.db.jobs/";

var layerMeetUs = "popUpMeetUs";
var popUpMeetUs = "meetUs";
var msgMeetUs = "Lerne uns persönlich kennen";
var labelMeetUs = "Meet Us";
var urlMeetUs= "https://db.jobs/service/search/de-de/9639412?qli=true&query=&itemsPerPage=10&pageNum=0&positiontype=Ausbildung&positiontype=Duales+Studium";

var layerDoVoting = "popUpDoVoting";
var popUpDoVoting = "doVoting";
var msgDoVoting = "Möchtest du am Voting teilnehmen und weitere interessante Dinge über die DB als Arbeitgeber erfahren?";
var labelDo = "Ja!";
var labelDont = "Kein Interesse";
var labelAbortVoting = "Voting abbrechen";


var popUpImportance = "importance";
var msgImportance = "Willkommen beim Voting. Lass uns direkt loslegen:\n\nWas ist dir wichtig?\n\nSpringe in das jeweilige Portal, um deine Stimme abzugeben.";

var popUpImportanceResult = "importanceResult";
var msgImportanceResult = "Na? Ist dir die Entscheidung schwer gefallen?\n\nZum Glück musst du dich bei uns nicht für eine der Optionen entscheiden. Du bekommst sie alle!";
var labelCool = "Cool!";

var popUpJobLocation = "jobLocation";
var msgJobLocation = "Wo möchtest du am liebsten arbeiten?\n\nGehe zum jeweiligen Ort, um deine Stimme abzugeben.";

var popUpJobLocationResult = "locationResult";
var msgJobLocationResult = "Bei uns kannst du jedem der Bereiche einstiegen. Schau dich doch einfach mal um:";
var labelShowJobs = "Zeig mir die Jobs!";
var urlJobs2 = "https://db.jobs/service/search/de-de/7707604?qli=true&query=&itemsPerPage=10&pageNum=0&country=Deutschland&positiontype=Ausbildung&positiontype=Duales+Studium"

var url1stRoom = "../db/hm-bahnhof#specialZones/voting/entry1stRoom";
var url2ndRoom = "../db/hm-bahnhof#specialZones/voting/entry2ndRoom";
var url3rdRoom = "../db/hm-bahnhof#specialZones/voting/entry3rdRoom";
var url4thRoom = "../db/hm-bahnhof#specialZones/voting/entry4thRoom";
var urlVotingExit = "../db/hm-bahnhof#specialZones/voting/votingExit";

var layerVoteAcq = "specialZones/voting/acquisitionVoting";
var layerVoteMoney = "specialZones/voting/moneyVoting";
var layerVoteTicket = "specialZones/voting/ticketVoting";
var layerVoteOffice = "specialZones/voting/officeVoting";
var layerVoteWorkshop = "specialZones/voting/workshopVoting";
var layerVoteTrain = "specialZones/voting/trainVoting";
var layerVoteOutside = "specialZones/voting/outsideVoting";
var layerExit2ndRoom = "specialZones/voting/exit2ndRoom";
var layerOpenExit = "specialZones/voting/openExit_auto";

var layerReset = "specialZones/voteReset";

//var urlPolling = "../src/worldmap.html";

var layerTime = "popUpTime";
var popUpTime = "time";
var msgTime = "Wusstest du eigentlich, dass du bei der Bahn immer geregelte Arbeitszeiten hast?";

var layerVacation = "popUpVacation";
var popUpVacation = "vacation";
var msgVacation = "Wusstest du eigentlich, dass du bei der DB 28 Tage Urlaub bekommst?";

var layerGarantueedAcquisition = "popUpAcquisition";
var popUpGarantueedAcquisition = "garantueedAcquisition";
var msgGarantueedAcquisition = "Wusstest du eigentlich, dass deine Übernahme bei der DB garantiert wird?";

var layerContact = "popUpContact";
var popUpContact = "contact";
var msgContact = "Wusstest du eigentlich, dass dir bei der Bahn zu jeder Zeit eine Ansprechperson zur Seite steht?";

var layerTickets = "popUpTickets";
var popUpTickets = "tickets";
var msgTickets = "Wusstest du eigentlich, dass du bei der Bahn Freifahrten in ganz Deutschland erhältst?";

var layerChest = "popUpChest";
var popUpChest = "chest";
var msgChest = "Wusstest du eigentlich, dass dir die Bahn eine attraktive Vergütung bietet?";

var layerPercent = "popUpPercent";
var popUpPercent = "percent";
var msgPercent = "Wusstest du eigentlich, dass du bei der Bahn diverse Vergünstigungen in den Bereichen Shopping, Freizeit, Reisen und Bahn erhältst?";

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    processPopUpArea();

    WA.room.onLeaveLayer(layerTime).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerTime).subscribe(() => {
        currentPopup = WA.ui.openPopup(popUpTime, msgTime,[
            {
                 label: labelClose,
                 callback: (popup => {
                    popup.close();
                    currentPopup = undefined;             
                 })
             }]);
     })
    
    WA.room.onLeaveLayer(layerVacation).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerVacation).subscribe(() => {
        currentPopup = WA.ui.openPopup(popUpVacation, msgVacation,[
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerGarantueedAcquisition).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerGarantueedAcquisition).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpGarantueedAcquisition, msgGarantueedAcquisition,[
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerContact).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerContact).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpContact, msgContact,[
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerTickets).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerTickets).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpTickets, msgTickets,[
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerChest).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerChest).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpChest, msgChest,[
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerPercent).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerPercent).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpPercent, msgPercent,[
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerJobs1).subscribe(() => {
        closePopUp(currentPopup)
    })
     
    WA.room.onEnterLayer(layerJobs1).subscribe(() => {
       currentPopup =  WA.ui.openPopup(popUpJobs1, msgJobs,[
            {
                label: labelJobs,
                callback: (popup => {
                    WA.nav.openTab(urlJobs);
                    popup.close();
                    currentPopup = undefined;
                })
            },
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerJobs2).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerJobs2).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpJobs2, msgJobs,[
             {
                 label: labelJobs,
                 callback: (popup => {
                     WA.nav.openTab(urlJobs);
                     popup.close();
                     currentPopup = undefined;
                 })
             },
             {
                 label: labelClose,
                 callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                 })
             }]);
     })
    
    WA.room.onLeaveLayer(layerJobProfiler).subscribe(() => {
        closePopUp(currentPopup)
    })
    
    WA.room.onEnterLayer(layerJobProfiler).subscribe(() => {
        currentPopup =  WA.ui.openPopup(popUpJobProfiler, msgJobProfiler,[
             {
                 label: labelJobProfiler,
                 callback: (popup => {
                     WA.nav.openTab(urlJobProfiler);
                     popup.close();
                     currentPopup = undefined;
                 })
             },
             {
                 label: labelClose,
                 callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                 })
             }]);
     })
    
    WA.room.onLeaveLayer(layerMeetUs).subscribe(() => {
        closePopUp(currentPopup);
    })
    
    WA.room.onEnterLayer(layerMeetUs).subscribe(() => {
        currentPopup = WA.ui.openPopup(popUpMeetUs, msgMeetUs,[
            {
                label: labelMeetUs,
                callback: (popup => {
                    WA.nav.openTab(urlMeetUs);
                    popup.close();
                    currentPopup = undefined;
                })
            },
            {
                label: labelClose,
                callback: (popup => {
                    popup.close();
                    currentPopup = undefined;
                })
            }]);
    })
    
    WA.room.onLeaveLayer(layerDoVoting).subscribe(() => {
        closePopUp(doVotingPopup);
    })
    
    WA.room.onEnterLayer(layerDoVoting).subscribe(() => {
        if (!WA.player.state.hasVoted) {
            doVotingPopup =  WA.ui.openPopup(popUpDoVoting, msgDoVoting,[
                {
                    label: labelDo,
                    callback: (popup => {
                        popup.close();
                        doVotingPopup = undefined;
                        WA.player.state.hasVoted = true;    // players shall only vote once
                        init1stRoom();
                    })
                },
                {
                    label: labelDont,
                    callback: (popup => {
                        popup.close();
                        doVotingPopup = undefined;
                    })
            }]);
        }    
    })

    WA.room.onEnterLayer(layerVoteAcq).subscribe(() => {
        WA.state.voteAcquisition = addOneDigit(WA.state.voteAcquisition);
        init2ndRoom();
    })

    WA.room.onLeaveLayer(layerVoteAcq).subscribe(() => {
        if (WA.state.voteAcquisition === 0) return
    })

    WA.room.onEnterLayer(layerVoteMoney).subscribe(() => {
        WA.state.voteMoney = addOneDigit(WA.state.voteMoney);
        init2ndRoom();
    })    
    WA.room.onLeaveLayer(layerVoteMoney).subscribe(() => {
        if (WA.state.voteMoney === 0) return
    })

    WA.room.onEnterLayer(layerVoteTicket).subscribe(() => {
        WA.state.voteTicket = addOneDigit(WA.state.voteTicket);
        init2ndRoom();
    })
    WA.room.onLeaveLayer(layerVoteTicket).subscribe(() => {
        if (WA.state.voteTicket === 0) return
    })

    WA.room.onEnterLayer(layerExit2ndRoom).subscribe(() => {
        init3rdRoom();
    })

    WA.room.onEnterLayer(layerVoteOffice).subscribe(() => {
        WA.state.voteOffice = addOneDigit(WA.state.voteOffice);
        init4thRoom();
    })
    WA.room.onLeaveLayer(layerVoteOffice).subscribe(() => {
        if (WA.state.voteOffice === 0) return
    })
    
    WA.room.onEnterLayer(layerVoteTrain).subscribe(() => {
        WA.state.voteTrain = addOneDigit(WA.state.voteTrain);
        init4thRoom();
    })
    WA.room.onLeaveLayer(layerVoteTrain).subscribe(() => {
        if (WA.state.voteTrain === 0) return
    })
    
    WA.room.onEnterLayer(layerVoteWorkshop).subscribe(() => {
        WA.state.voteWorkshop = addOneDigit(WA.state.voteWorkshop);
        init4thRoom();
    })
    WA.room.onLeaveLayer(layerVoteWorkshop).subscribe(() => {
        if (WA.state.voteWorkshop === 0) return
    })
    
    WA.room.onEnterLayer(layerVoteOutside).subscribe(() => {
        WA.state.voteOutside = addOneDigit(WA.state.voteOutside);
        init4thRoom();
    })
    WA.room.onLeaveLayer(layerVoteOutside).subscribe(() => {
        if (WA.state.voteOutside === 0) return
    })

    WA.room.onEnterLayer(layerOpenExit).subscribe(() => {
        exitVoting();
    })

    let voteResetPopup: any;
    WA.room.onEnterLayer(layerReset).subscribe(() => {
        if(WA.player.tags.includes("editor")||WA.player.tags.includes("admin")||WA.player.tags.includes("hm-station-admin")) {
            voteResetPopup = WA.ui.openPopup(
            "resetPopup",
            "Soll das Voting zurückgesetzt werden?",
            [
                {
                  label: "Reset",
                  className: "error",
                  callback: () => {
                    (WA.state.voteMoney = WA.state.voteAcquisition = WA.state.voteTicket = WA.state.voteOffice = WA.state.voteOutside = WA.state.voteWorkshop = WA.state.voteTrain = 0),
                    WA.player.state.hasVoted = false
                    }
                }
            ])
        }
    })
    WA.room.onLeaveLayer(layerReset).subscribe(() => {
        voteResetPopup.close()
    })

    // contact forms
    processPopUpArea;
    
    /*
    *  Hiding Layers .... ICE
    */

    var layerICE1roof = "trains_top/ice1_roof";
    var layerICE1maul = "trains_top/ice1_maul";
    var layerICE2roof = "trains_top/ice2_roof";
    var layerICE2maul = "trains_top/ice2_maul";
    var layerICE3roof = "trains_top/ice3_roof";
    var layerICE3maul = "trains_top/ice3_maul";
    var layerICE4roof = "trains_top/ice4_roof";
    var layerICE4maul = "trains_top/ice4_maul";
    var layerRegio1roof = "trains_top/regio1_roof";
    var layerRegio1maul = "trains_top/regio1_maul";
    var layerRegio2roof = "trains_top/regio2_roof";
    var layerRegio2maul = "trains_top/regio2_maul";
    var hidelayerICE1 = "specialZones/ICEs/hideICE1";
    var hidelayerICE2 = "specialZones/ICEs/hideICE2";
    var hidelayerICE3 = "specialZones/ICEs/hideICE3";
    var hidelayerICE4 = "specialZones/ICEs/hideICE4";
    var hidelayerRegio1 = "specialZones/ICEs/hideRegio1";
    var hidelayerRegio2 = "specialZones/ICEs/hideRegio2";

    WA.room.onLeaveLayer(hidelayerICE1).subscribe(() => {
        WA.room.showLayer(layerICE1roof);
        WA.room.hideLayer(layerICE1maul);
    })
    
    WA.room.onEnterLayer(hidelayerICE1).subscribe(() => {
        WA.room.hideLayer(layerICE1roof);
        WA.room.showLayer(layerICE1maul);
    })

    WA.room.onLeaveLayer(hidelayerICE2).subscribe(() => {
        WA.room.showLayer(layerICE2roof);
        WA.room.hideLayer(layerICE2maul);
    })
    
    WA.room.onEnterLayer(hidelayerICE2).subscribe(() => {
        WA.room.hideLayer(layerICE2roof);
        WA.room.showLayer(layerICE2maul);
    })

    WA.room.onLeaveLayer(hidelayerICE3).subscribe(() => {
        WA.room.showLayer(layerICE3roof);
        WA.room.hideLayer(layerICE3maul);
    })
    
    WA.room.onEnterLayer(hidelayerICE3).subscribe(() => {
        WA.room.hideLayer(layerICE3roof);
        WA.room.showLayer(layerICE3maul);
    })

    WA.room.onLeaveLayer(hidelayerICE4).subscribe(() => {
        WA.room.showLayer(layerICE4roof);
        WA.room.hideLayer(layerICE4maul);
    })
    
    WA.room.onEnterLayer(hidelayerICE4).subscribe(() => {
        WA.room.hideLayer(layerICE4roof);
        WA.room.showLayer(layerICE4maul);
    })

    WA.room.onLeaveLayer(hidelayerRegio1).subscribe(() => {
        WA.room.showLayer(layerRegio1roof);
        WA.room.hideLayer(layerRegio1maul);
    })
    
    WA.room.onEnterLayer(hidelayerRegio1).subscribe(() => {
        WA.room.hideLayer(layerRegio1roof);
        WA.room.showLayer(layerRegio1maul);
    })

    WA.room.onLeaveLayer(hidelayerRegio2).subscribe(() => {
        WA.room.showLayer(layerRegio2roof);
        WA.room.hideLayer(layerRegio2maul);
    })
    
    WA.room.onEnterLayer(hidelayerRegio2).subscribe(() => {
        WA.room.hideLayer(layerRegio2roof);
        WA.room.showLayer(layerRegio2maul);
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

// insert minimap
WA.ui.actionBar.addButton({
    id:"minimap",
    type:"action",
    imageSrc:"https://buenni86.github.io/hm-station/map_logo.png",
    toolTip:"Minimap",
    callback: async () => {
        if (currentWebsite !== undefined) {
            currentWebsite.close();
            currentWebsite = undefined;
        } else {
            currentWebsite = await WA.nav.openCoWebSite("../minimap.html",true);
        }
    }
})

/*
 *  Voting
 */

var roofLayer1 = "voting_top_closed/room1";
var roofLayer2 = "voting_top_closed/room2";
var roofLayer3 = "voting_top_closed/room3";
var roofLayer4 = "voting_top_closed/room4";
var roofLayerMain = "voting_top_opened/mainRoom";
var openRoofLayer1 = "voting_top_opened/room1";
var openRoofLayer2 = "voting_top_opened/room2";
var openRoofLayer3 = "voting_top_opened/room3";
var openRoofLayer4 = "voting_top_opened/room4";

function addOneDigit(currVal: unknown) {
    if (typeof currVal !== 'number') {
        return;
    } else {
        return currVal + 1;
    }
}

function abortVoting() {    
    WA.room.hideLayer(roofLayerMain);
    WA.room.hideLayer(openRoofLayer1);
    WA.room.hideLayer(openRoofLayer2);
    WA.room.hideLayer(openRoofLayer3);
    WA.room.hideLayer(openRoofLayer4);
    WA.room.showLayer(roofLayer1);
    WA.room.showLayer(roofLayer2);
    WA.room.showLayer(roofLayer3);
    WA.room.showLayer(roofLayer4);

    WA.nav.goToRoom(urlVotingExit);
}

function exitVoting() {
    WA.room.hideLayer(roofLayerMain);
    WA.room.hideLayer(openRoofLayer4);
    WA.room.showLayer(roofLayer4);

    WA.nav.goToRoom(urlVotingExit);
}

function init1stRoom() {
    console.log("preparing 1st room...");
    WA.room.hideLayer(roofLayer1);
    WA.room.showLayer(roofLayerMain);
    WA.room.showLayer(openRoofLayer1);

    closePopUp(currentPopup);
    // enter next room
    WA.nav.goToRoom(url1stRoom);

    currentPopup =  WA.ui.openPopup(popUpImportance, msgImportance,[
        {
            label: labelClose,
            callback: (popup => {
                popup.close();
                currentPopup = undefined;
            })
        },
        {
            label: labelAbortVoting,
            callback: (popup => {
                popup.close();
                currentPopup = undefined;
                abortVoting();
            })
        }]);
}

function init2ndRoom() {
    console.log("preparing 2nd room...");

    WA.room.showLayer(roofLayer1);
    WA.room.showLayer(roofLayerMain);
    WA.room.showLayer(openRoofLayer2);

    WA.room.hideLayer(openRoofLayer1);
    WA.room.hideLayer(roofLayer2);

    closePopUp(currentPopup);
    // enter next room
    WA.nav.goToRoom(url2ndRoom);

    currentPopup =  WA.ui.openPopup(popUpImportanceResult, msgImportanceResult,[
        {
            label: labelCool,
            callback: (popup => {
                popup.close();
                currentPopup = undefined;
            })
        },
        {
            label: labelAbortVoting,
            callback: (popup => {
                popup.close();
                currentPopup = undefined;
                abortVoting();
            })
        }]);
}

function init3rdRoom() {
    console.log("preparing 3rd room...");

    WA.room.showLayer(roofLayerMain);
    WA.room.showLayer(roofLayer2);
    WA.room.showLayer(openRoofLayer3);

    WA.room.hideLayer(openRoofLayer2);
    WA.room.hideLayer(roofLayer3);
    
    closePopUp(currentPopup)
    // enter next room
    WA.nav.goToRoom(url3rdRoom);

    currentPopup =  WA.ui.openPopup(popUpJobLocation, msgJobLocation,[
    {
        label: labelClose,
        callback: (popup => {
            popup.close();
            currentPopup = undefined;
        })
    },
    {
        label: labelAbortVoting,
        callback: (popup => {
            popup.close();
            currentPopup = undefined;
            abortVoting();
        })
    }]);
}

function init4thRoom() {
    console.log("preparing 4th room...");

    WA.room.showLayer(roofLayerMain);
    WA.room.showLayer(roofLayer3);
    WA.room.showLayer(openRoofLayer4);

    WA.room.hideLayer(openRoofLayer3);
    WA.room.hideLayer(roofLayer4);
    
    closePopUp(currentPopup)
    // enter next room
    WA.nav.goToRoom(url4thRoom);

    currentPopup = WA.ui.openPopup(popUpJobLocationResult, msgJobLocationResult,[
    {
        label: labelShowJobs,
        callback: (popup => {
            WA.nav.openTab(urlJobs2);
            popup.close();
            currentPopup = undefined;
        })
    },
    {
        label: labelClose,
        callback: (popup => {
            popup.close();
            currentPopup = undefined;
        })
    },
    {
        label: labelAbortVoting,
        callback: (popup => {
            popup.close();
            currentPopup = undefined;
            abortVoting();
        })
    }]);
}

const contactPopUpArea = new Map ([
    ["contact1", "popUpContact1"],
    ["contact2", "popUpContact2"],
    ["contact3", "popUpContact3"],
    ["contact4", "popUpContact4"],
    ["contact5", "popUpContact5"],
])

var msgContact = "Persönliche Beratung gewünscht? Hinterlasse hier deine Kontaktdaten!";
var labelContact = "Kontaktformular öffnen";
var urlContact = "https://dbgroup.avature.net/levelup";

function processPopUpArea() {

    // contact forms
    for (let[popUpArea, popUpId] of contactPopUpArea.entries()) {
        WA.room.area.onEnter(popUpArea).subscribe(() => {
            createContactPopUp(popUpId)
        })
    
        WA.room.area.onLeave(popUpArea).subscribe(() => {
            closePopUp(currentPopup);
        })
    }
}

function createContactPopUp(popUpId: any) {
    currentPopup = WA.ui.openPopup(popUpId, msgContact, [
        {
            label: labelContact,
            className: "primary",
            callback: (popup) => {
                WA.nav.openTab(urlContact);
                popup.close();
                currentPopup = undefined;
            }
        },
        {
            label: labelClose,
            callback: (popup) => {
                popup.close();
                currentPopup = undefined;
            }
        }
    ])
}

function closePopUp(currPopup: any){
    if (currPopup !== undefined) {
        currPopup.close();
        currPopup = undefined;
    }
}

export {};