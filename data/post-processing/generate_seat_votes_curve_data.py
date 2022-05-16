import matplotlib.pyplot as plt
import numpy as np
import os
import json

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



def SeatsVotePlot(a_votes, b_votes, party_label, line_color, plot_reverse = False):
    """
    Constructs a Vote-Seat Plot for the given election results
    a_votes: an array of votes for party A indexed by district
    b_votes: an array of votes for party B indexed by district 
    """
    
    # Calculation
    once = 0
    color1 = line_color
    Label1 = party_label
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
    
    print("length of flips:", len(flips))
    
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
    
    plt.plot(last_verticle,np.linspace((num_districts-1)/num_districts,1,1000) ,color1)
    plt.plot(np.linspace(0,flips[0],1000),zeros, color1)
    plt.plot(np.linspace(flips[-1],1,1000),ones, color1, label=Label1)
    '''
    thing1=last_verticle
    thing2=np.linspace((num_districts-1)/num_districts,1,1000)
    thing3=np.linspace(0,flips[0],1000)
    thing4=zeros
    thing5=np.linspace(flips[-1],1,1000)
    thing6=ones
    
    X=[]
    Y=[]
    X.extend(thing1)
    X.extend(thing3)
    X.extend(thing5)
    
    Y.extend(thing2)
    Y.extend(thing4)
    Y.extend(thing6)
    
    plt.plot(X,Y, color1)'''
    
    # If plot_reverse is true, run the function again to plot the republican
    # seats-vote curve
    if plot_reverse:
        print('republican')
        if once == 0:
            once += 1
            color1 = 'r'
            Label1 = 'Republican'
            SeatsVotePlot(b_votes,a_votes, Label1, color1)
    
    # Add a title and legend
    plt.title(Title)
    plt.legend()
    #return zipped_dems


if __name__ == '__main__':
    Title = 'Tennessee 2020'
    a_votes = np.array([185180,114967,104762,112984,191226,91103,176422,95691,122566])
    b_votes = np.array([132247,183601,220989,225531,208212,225318,106146,214643,222057])   

    # Indiana 2018
    Title = 'Indiana 2018'
    a_votes_2018 = np.array([159611,103363,86610,87824,137142,79430,141139,86895,118090])
    b_votes_2018 = np.array([85594,125499,158927,156539,180035,154260,76457,157396,153271])
    
    zipped=SeatsVotePlot(a_votes_2018, b_votes_2018, "Democrat", "b",  plot_reverse = True)