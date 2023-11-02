public class Solution {
    public int CountMatches(IList<IList<string>> items, string ruleKey, string ruleValue) {
      int output = 0;
      int ruleKeyIndex= -1;
      
        switch(ruleKey){
          case "type":
            ruleKeyIndex = 0;
            break;
          case "color":
            ruleKeyIndex = 1;
            break;
          case "name":
            ruleKeyIndex = 2;
            break;
        }
    foreach (var item in items)
    {
      if(item[ruleKeyIndex] == ruleValue) output++;
    }
      return output;
    }
}