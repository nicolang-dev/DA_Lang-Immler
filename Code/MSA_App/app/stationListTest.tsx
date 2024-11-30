import StationList from "@/components/StationList";
import Station from "@/components/Station";

export default function StationListTest(){
    const station1 = new Station("name1", "", "url1");
    const station2 = new Station("name2", "", "url2");
    const station3 = new Station("name3", "", "url3");

    let stationList = [];
    stationList.push(station1);
    stationList.push(station2);
    stationList.push(station3);

    console.log(stationList.includes(station1));

    return(
       <StationList stations={stationList} selectedStations={[]}/>
    )
}