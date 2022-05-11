import matplotlib.pyplot as plt
import numpy as np

# THIS is going to pull JSONS from directory processed_districtplan_path/...percents

def flipPoints(a_votes, b_votes):
    """
    Returns the array of points where the step function of the Seats-Vote plot steps
    a_votes: an array of votes for party A indexed by district
    b_votes: an array of votes for party B indexed by district 
    """
    
    num_districts = len(a_votes)
    a_votes_sum = np.sum(a_votes)
    b_votes_sum = np.sum(b_votes)
    total_votes = a_votes_sum + b_votes_sum
    seats_won_a = np.zeros(num_districts)
    
    
    # Create copies of both arrays to adjust and an array to store the flip points
    a_votes_adjusted = np.copy(a_votes) 
    b_votes_adjusted = np.copy(b_votes)
    flip_points = []
    
    # Calculate V_0
    a_vote_share_adjusted = (np.sum(a_votes_adjusted)) / (np.sum(a_votes_adjusted) + np.sum(b_votes_adjusted))
    
    # Loop through the states adding votes to party a until they have all votes
    while a_vote_share_adjusted != 1:
        for i in range(num_districts):
            if b_votes_adjusted[i] != 0:
                a_votes_adjusted[i] += 1
                b_votes_adjusted[i] -= 1
                
            if a_votes_adjusted[i] == b_votes_adjusted[i] or a_votes_adjusted[i] == b_votes_adjusted[i] + 1:
                flip_points.append(a_vote_share_adjusted)

        a_vote_share_adjusted = (np.sum(a_votes_adjusted)) / (np.sum(a_votes_adjusted) + np.sum(b_votes_adjusted))        
    
    # Create copies of both arrays to adjust
    a_votes_adjusted = np.copy(a_votes) 
    b_votes_adjusted = np.copy(b_votes)
    
    # Calculate V_0
    a_vote_share_adjusted = (np.sum(a_votes_adjusted)) / (np.sum(a_votes_adjusted) + np.sum(b_votes_adjusted))
    
    # Loop through the states removing votes from party a until they have no votes
    while a_vote_share_adjusted != 0:
        for i in range(num_districts):
            if a_votes_adjusted[i] != 0:
                a_votes_adjusted[i] -= 1
                b_votes_adjusted[i] += 1
                
            if a_votes_adjusted[i] == b_votes_adjusted[i] or a_votes_adjusted[i] == b_votes_adjusted[i] + 1:
                flip_points.append(a_vote_share_adjusted)

        a_vote_share_adjusted = (np.sum(a_votes_adjusted)) / (np.sum(a_votes_adjusted) + np.sum(b_votes_adjusted)) 
    # Return the flip points
    return np.sort(flip_points)

def SeatsVotePlot(a_votes, b_votes, plot_reverse = True):
    """
    Constructs a Vote-Seat Plot for the given election results
    a_votes: an array of votes for party A indexed by district
    b_votes: an array of votes for party B indexed by district 
    """
    
    # Calculation
    once = 0
    color1 = 'b'
    Label1 = 'Democrats' 
    num_districts = len(a_votes)
    a_votes_sum = np.sum(a_votes)
    b_votes_sum = np.sum(b_votes)
    total_votes = a_votes_sum + b_votes_sum
    seats_won_a = np.zeros(num_districts)
    
    print("num_districts: ", num_districts)
    
    # Calculate the number of seats won by party a
    for i in range(9):
        if a_votes[i] > b_votes[i]:
            seats_won_a[i] = 1

    # Calculate the vote share vectors
    a_vote_share = a_votes_sum / total_votes
    a_seat_share = np.sum(seats_won_a) / num_districts
    
    # Create arrays to help with plotting
    x = np.linspace(0, 1, 1000)
    const = np.empty(1000)
    const.fill(0.5)
    
    # Plot the basic empty plot
    plt.xlim(left = 0, right = 1)
    plt.ylim(bottom = 0, top =1.01)
    plt.xlabel("Vote Share")
    plt.ylabel("Seat Share")
    plt.axis
    
    # Plot the realised election result
    plt.plot(a_vote_share, a_seat_share, 'ko', markersize = 4)
    
    # Plot the lines seatshare=1/2, voteshare=1/2
    plt.plot(x,const, 'black')
    plt.plot(const,x, 'black')
    
    # Use the function flipPoints to find the flip points
    flips = flipPoints(a_votes, b_votes)
    flips.sort()
    
    # For each of the flip points plot the seats-vote curve
    for i in range(len(flips)-1):
        constant = np.empty(1000)
        constant.fill((i+1)/num_districts)
        plt.plot(np.linspace(flips[i], flips[i+1],1000),constant,color1)
        
        vconstant = np.empty(1000)
        vconstant.fill(flips[i])
        plt.plot(vconstant, np.linspace(i/num_districts,(i+1)/num_districts,1000),color1)
    
    # Plot the last verticle line that does not get plotted by the previous for loop
    ones = np.empty(1000)
    zeros = np.empty(1000)
    last_verticle = np.empty(1000)
    ones.fill(1)
    zeros.fill(0)
    last_verticle.fill(flips[-1])
    
    thing1=last_verticle
    thing2=np.linspace((num_districts-1)/num_districts,1,1000)
    
    thing3=np.linspace(0,flips[0],1000)
    thing4=zeros
    
    thing5=np.linspace(flips[-1],1,1000)
    thing6=ones
    '''
    print("first curve X:", thing1)
    print("first curve Y:", thing2)
    
    print("second curve X:", thing3)
    print("second curve Y:", thing4)
    
    print("third curve X:", thing5)
    print("third curve Y:", thing6)
    '''
    
    thingXlist=[]
    thingXlist.append(thing1)
    thingXlist.append(thing3)
    thingXlist.append(thing5)
    
    thingXlist_flattened = [item for sublist in thingXlist for item in sublist]
    
    thingYlist=[]
    thingYlist.append(thing2)
    thingYlist.append(thing4)
    thingYlist.append(thing6)
    
    thingYlist_flattened = [item for sublist in thingYlist for item in sublist]
    
    print(len(thingXlist_flattened))
    print(len(thingYlist_flattened))
    
    #plt.plot(thingXlist_flattened, thingYlist_flattened ,color1)
    
    
    plt.plot(thing1, thing2 ,color1)
    plt.plot(thing3, thing4, color1)
    plt.plot(thing5, thing6, color1, label=Label1)
   
    
    zipped_dems = zip(thing5, thing3)

    # If plot_reverse is true, run the function again to plot the republican
    # seats-vote curve
    if plot_reverse:
        if once == 0:
            once += 1
            color1 = 'r'
            Label1 = 'Republicans'
            SeatsVotePlot(b_votes,a_votes)
    
    # Add a title and legend
    plt.title(Title)
    plt.legend()
    return zipped_dems

def EfficiencyGap(a_votes, b_votes):
    # Initialize the variables as zero 
    EG = 0
    wasted_a = 0
    wasted_b = 0
    
    # for each district, calculate the wasted votes for each party 
    for i in range(len(a_votes)):
        if a_votes[i] > b_votes[i]: # if party a wins district i 
            wasted_b += b_votes[i]
            wasted_a += a_votes[i] - ((a_votes[i]+b_votes[i]) / 2)
        else:                       # if party b wins district i
            wasted_a += a_votes[i]
            wasted_b += b_votes[i] - ((a_votes[i]+b_votes[i]) / 2)
    
    # Calculate the Efficiency Gap
    EG = (wasted_a - wasted_b) / (sum(a_votes) + sum(b_votes))
    
    return EG

if __name__ == '__main__':

    # SAMPLE DATA
    Title = 'Tennessee 2020'
    a_votes = np.array([185180,114967,104762,112984,191226,91103,176422,95691,122566])
    b_votes = np.array([132247,183601,220989,225531,208212,225318,106146,214643,222057])   

    # Indiana 2018
    Title = 'Indiana 2018'
    a_votes_2018 = np.array([159611,103363,86610,87824,137142,79430,141139,86895,118090])
    b_votes_2018 = np.array([85594,125499,158927,156539,180035,154260,76457,157396,153271])
    
    zipped=SeatsVotePlot(a_votes, b_votes, plot_reverse = False)
    
    
